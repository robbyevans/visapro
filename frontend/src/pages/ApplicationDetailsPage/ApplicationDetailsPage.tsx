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

  // In ApplicationDetailsPage.tsx, update getDocumentUrl:
  const getDocumentUrl = (document: AppDocument) => {
    // First try the full URL if available
    if (document.file_full_url && document.file_full_url.startsWith("http")) {
      return document.file_full_url;
    }

    // Then try the regular file_url as full URL
    if (document.file_url && document.file_url.startsWith("http")) {
      return document.file_url;
    }

    // If it's a relative path, construct the full URL
    if (document.file_url && document.file_url.startsWith("/")) {
      const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
      return `${baseUrl}${document.file_url}`;
    }

    // Fallback
    console.warn("Invalid document file_url:", document.file_url);
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
      const link = globalThis.document.createElement("a"); // Use globalThis.document
      link.href = url;
      link.download = fileName || `document_${document.id}`;
      globalThis.document.body.appendChild(link); // Use globalThis.document
      link.click();
      globalThis.document.body.removeChild(link); // Use globalThis.document
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
    // Use AppDocument here
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
  // Add this debug function to ApplicationDetailsPage.tsx
  const debugDocumentUrls = (documents: AppDocument[]) => {
    console.log("=== DOCUMENT URL DEBUG ===");
    documents.forEach((doc, index) => {
      console.log(`Document ${index + 1}:`, {
        id: doc.id,
        type: doc.doc_type,
        file_url: doc.file_url,
        constructed_url: getDocumentUrl(doc),
      });
    });
    console.log("=== END DEBUG ===");
  };

  // Call this in your component (temporarily)
  useEffect(() => {
    if (documents.length > 0) {
      debugDocumentUrls(documents);
    }
  }, [documents]);

  const getFileNameFromUrl = (url: string, docType: string, docId: number) => {
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
