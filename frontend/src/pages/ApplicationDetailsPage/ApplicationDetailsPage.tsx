import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApplications } from "../../redux/hooks/useApplications";
import { useUser } from "../../redux/hooks/useUser";
import Spinner from "../../components/Spinner/Spinner";
import EditDocument from "../../components/Documents/EditDocument";
import DocumentPreview from "../../components/Documents/DocumentPreview";
import * as S from "./styles";
import type { IDocument as AppDocument } from "../../redux/types";
import type { IDocument } from "../../redux/types";

// FIX: Use a hardcoded API URL or window location for client-side
const getApiBaseUrl = () => {
  // For client-side, use window location or a hardcoded value
  if (typeof window !== "undefined") {
    // You can use the current window origin or a configured value
    return window.location.origin.includes("localhost")
      ? "http://localhost:3000"
      : "https://your-production-api.com";
  }
  return "http://localhost:3000"; // Fallback
};

const API_BASE_URL = getApiBaseUrl();

const ApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentApplication, fetchApplication, isLoading } = useApplications();
  const { currentUser } = useUser();

  const [previewDocument, setPreviewDocument] = useState<{
    fileUrl: string;
    fileName: string;
  } | null>(null);

  useEffect(() => {
    if (id) {
      fetchApplication(parseInt(id));
    }
  }, [id, fetchApplication]);

  const documents = currentApplication?.documents || [];

  const passportDocuments = documents.filter(
    (doc) => doc.doc_type === "passport"
  );
  const otherDocuments = documents.filter(
    (doc) => doc.doc_type !== "passport" && doc.doc_type !== "visa"
  );
  const visaDocuments = documents.filter((doc) => doc.doc_type === "visa");

  // FIXED: Use the constant instead of process.env directly
  const getDocumentUrl = (document: AppDocument): string => {
    if (!document) {
      console.warn("Document is undefined or null");
      return "";
    }

    if (document.file_url && typeof document.file_url === "string") {
      if (document.file_url.startsWith("http")) {
        return document.file_url;
      }

      if (document.file_url.startsWith("/")) {
        return `${API_BASE_URL}${document.file_url}`;
      }

      return `${API_BASE_URL}/uploads/${document.file_url}`;
    }

    console.warn("Invalid document file_url:", document.file_url, document);
    return "";
  };

  const handleDownloadDocument = async (
    document: IDocument,
    fileName: string
  ) => {
    try {
      const fileUrl = getDocumentUrl(document);

      if (!fileUrl) {
        console.error("No valid file URL for document:", document);
        return;
      }

      const response = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = globalThis.document.createElement("a");
      link.href = url;
      link.download = fileName || `document_${document.id}`;
      globalThis.document.body.appendChild(link);
      link.click();
      globalThis.document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      const fileUrl = getDocumentUrl(document);
      if (fileUrl) {
        const link = globalThis.document.createElement("a");
        link.href = fileUrl;
        link.download = fileName || `document_${document.id}`;
        globalThis.document.body.appendChild(link);
        link.click();
        globalThis.document.body.removeChild(link);
      }
    }
  };

  const handlePreviewDocument = (document: AppDocument, fileName: string) => {
    const fileUrl = getDocumentUrl(document);
    if (fileUrl) {
      setPreviewDocument({
        fileUrl,
        fileName: fileName || `document_${document.id}`,
      });
    } else {
      console.error("Cannot preview document - no valid URL:", document);
    }
  };

  const handleClosePreview = () => {
    setPreviewDocument(null);
  };

  const getFileNameFromUrl = (url: string, docType: string, docId: number) => {
    if (!url) return `${docType}_${docId}`;

    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const fileName = pathname.split("/").pop() || `${docType}_${docId}`;
      return fileName;
    } catch {
      return `${docType}_${docId}`;
    }
  };

  const handleReplaceDocument = async (file: File, documentId: number) => {
    console.log("Replace document:", documentId, file);
  };

  if (isLoading || !currentApplication) {
    return (
      <S.ApplicationDetailsContainer>
        <Spinner size="lg" />
      </S.ApplicationDetailsContainer>
    );
  }

  const isAdmin = currentUser?.role === "admin";
  const canEdit = !isAdmin && currentApplication.status === "pending";

  return (
    <S.ApplicationDetailsContainer>
      <S.Header>
        <S.BackButton onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </S.BackButton>
        <S.PageTitle>
          Application #{currentApplication.id} -{" "}
          {currentApplication.athlete?.first_name}{" "}
          {currentApplication.athlete?.last_name}
        </S.PageTitle>
      </S.Header>

      <S.Content>
        {/* Application Details - unchanged */}

        {/* Documents Section */}
        <S.Section>
          <S.SectionTitle>Documents</S.SectionTitle>

          {/* Passport Documents */}
          {passportDocuments.length > 0 && (
            <S.DocumentSection>
              <S.DocumentSectionTitle>
                Passport Documents
              </S.DocumentSectionTitle>
              <S.DocumentList>
                {passportDocuments.map((doc) => {
                  if (!doc) return null;
                  const fileName = getFileNameFromUrl(
                    doc.file_url,
                    doc.doc_type,
                    doc.id
                  );
                  return (
                    <S.DocumentItem key={doc.id}>
                      <S.DocumentInfo>
                        <S.DocumentType>{doc.doc_type}</S.DocumentType>
                        <S.DocumentName>{fileName}</S.DocumentName>
                      </S.DocumentInfo>
                      {canEdit ? (
                        <EditDocument
                          fileName={fileName}
                          fileUrl={doc.file_url}
                          onReplace={(file) =>
                            handleReplaceDocument(file, doc.id)
                          }
                          onDownload={() =>
                            handleDownloadDocument(doc, fileName)
                          }
                          type="passport"
                        />
                      ) : (
                        <S.DocumentActions>
                          {isAdmin && (
                            <S.PreviewButton
                              onClick={() =>
                                handlePreviewDocument(doc, fileName)
                              }
                            >
                              Preview
                            </S.PreviewButton>
                          )}
                          <S.DownloadButton
                            onClick={() =>
                              handleDownloadDocument(doc, fileName)
                            }
                          >
                            Download
                          </S.DownloadButton>
                        </S.DocumentActions>
                      )}
                    </S.DocumentItem>
                  );
                })}
              </S.DocumentList>
            </S.DocumentSection>
          )}

          {/* Other Documents */}
          {otherDocuments.length > 0 && (
            <S.DocumentSection>
              <S.DocumentSectionTitle>
                Supporting Documents
              </S.DocumentSectionTitle>
              <S.DocumentList>
                {otherDocuments.map((doc) => {
                  if (!doc) return null;
                  const fileName = getFileNameFromUrl(
                    doc.file_url,
                    doc.doc_type,
                    doc.id
                  );
                  return (
                    <S.DocumentItem key={doc.id}>
                      <S.DocumentInfo>
                        <S.DocumentType>{doc.doc_type}</S.DocumentType>
                        <S.DocumentName>{fileName}</S.DocumentName>
                      </S.DocumentInfo>
                      {canEdit && doc.doc_type === "invitation_letter" ? (
                        <EditDocument
                          fileName={fileName}
                          fileUrl={doc.file_url}
                          onReplace={(file) =>
                            handleReplaceDocument(file, doc.id)
                          }
                          onDownload={() =>
                            handleDownloadDocument(doc, fileName)
                          }
                          type="invitation_letter"
                        />
                      ) : (
                        <S.DocumentActions>
                          {isAdmin && (
                            <S.PreviewButton
                              onClick={() =>
                                handlePreviewDocument(doc, fileName)
                              }
                            >
                              Preview
                            </S.PreviewButton>
                          )}
                          <S.DownloadButton
                            onClick={() =>
                              handleDownloadDocument(doc, fileName)
                            }
                          >
                            Download
                          </S.DownloadButton>
                        </S.DocumentActions>
                      )}
                    </S.DocumentItem>
                  );
                })}
              </S.DocumentList>
            </S.DocumentSection>
          )}

          {/* Visa Documents */}
          {visaDocuments.length > 0 && (
            <S.DocumentSection>
              <S.DocumentSectionTitle>Visa Documents</S.DocumentSectionTitle>
              <S.DocumentList>
                {visaDocuments.map((doc) => {
                  if (!doc) return null;
                  const fileName = getFileNameFromUrl(
                    doc.file_url,
                    doc.doc_type,
                    doc.id
                  );
                  return (
                    <S.DocumentItem key={doc.id}>
                      <S.DocumentInfo>
                        <S.DocumentType>visa</S.DocumentType>
                        <S.DocumentName>{fileName}</S.DocumentName>
                      </S.DocumentInfo>
                      <S.DocumentActions>
                        {isAdmin && (
                          <S.PreviewButton
                            onClick={() => handlePreviewDocument(doc, fileName)}
                          >
                            Preview
                          </S.PreviewButton>
                        )}
                        <S.DownloadButton
                          onClick={() => handleDownloadDocument(doc, fileName)}
                        >
                          Download
                        </S.DownloadButton>
                      </S.DocumentActions>
                    </S.DocumentItem>
                  );
                })}
              </S.DocumentList>
            </S.DocumentSection>
          )}

          {documents.length === 0 && (
            <S.NoDocuments>
              No documents uploaded for this application yet.
            </S.NoDocuments>
          )}
        </S.Section>

        {/* Status Timeline - unchanged */}
      </S.Content>

      {/* Document Preview Modal */}
      {previewDocument && (
        <DocumentPreview
          fileUrl={previewDocument.fileUrl}
          fileName={previewDocument.fileName}
          onClose={handleClosePreview}
        />
      )}
    </S.ApplicationDetailsContainer>
  );
};

export default ApplicationDetailsPage;
