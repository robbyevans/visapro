import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApplications } from "../../redux/hooks/useApplications";
import { useUser } from "../../redux/hooks/useUser";
import Spinner from "../../components/Spinner/Spinner";
import EditDocument from "../../components/Documents/EditDocument";
import DocumentPreview from "../../components/Documents/DocumentPreview";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
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

  const getProgressInfo = () => {
    if (!currentApplication) {
      return { percentage: 0, status: "Unknown" };
    }

    let percentage = 0;
    const status = currentApplication.status;

    switch (status) {
      case "pending":
        percentage = 25; // Application submitted
        break;
      case "approved":
        percentage = 50; // Application approved
        break;
      case "invoiced":
        percentage = 75; // Payment processed
        break;
      case "completed":
        percentage = 100; // Visa issued
        break;
      case "rejected":
        percentage = 100; // Process ended (rejected)
        break;
      default:
        percentage = 0;
    }

    return { percentage, status };
  };

  // FIXED: Simplified URL getter
  const getDocumentUrl = (document: AppDocument): string => {
    return document.file_url || "";
  };

  const handleDownloadDocument = async (
    document: IDocument,
    fileName: string
  ) => {
    try {
      // Use download_url if available, otherwise fall back to file_url
      const downloadUrl = document.download_url || document.file_url;

      if (!downloadUrl) {
        console.error("No valid download URL for document:", document);
        return;
      }

      const response = await fetch(downloadUrl, {
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
      // Fallback: try to open the file_url in a new tab
      const fileUrl = document.file_url;
      if (fileUrl) {
        window.open(fileUrl, "_blank");
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

      const decodedFileName = decodeURIComponent(fileName);
      return decodedFileName;
    } catch {
      return `${docType}_${docId}`;
    }
  };

  const getDisplayFileName = (fileName: string, maxLength: number = 15) => {
    if (!fileName) return "";

    const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");

    if (nameWithoutExtension.length <= maxLength) {
      return fileName;
    }

    const truncatedName = nameWithoutExtension.substring(0, maxLength) + "...";
    const extension = fileName.split(".").pop();

    return `${truncatedName}.${extension}`;
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
  const progressInfo = getProgressInfo();

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
        {/* Progress Bar Section */}
        <ProgressBar
          percentage={progressInfo.percentage}
          status={currentApplication.status}
        />

        <S.Section>
          <S.SectionTitle>Application Details</S.SectionTitle>
          <S.DetailGrid>
            <S.DetailItem>
              <S.DetailLabel>Applicant Name</S.DetailLabel>
              <S.DetailValue>
                {currentApplication.athlete?.first_name}{" "}
                {currentApplication.athlete?.last_name}
              </S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Passport Number</S.DetailLabel>
              <S.DetailValue>
                {currentApplication.athlete?.passport_number || "N/A"}
              </S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Destination Country</S.DetailLabel>
              <S.DetailValue>{currentApplication.country}</S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Status</S.DetailLabel>
              <S.StatusBadge status={currentApplication.status}>
                {currentApplication.status}
              </S.StatusBadge>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Submitted Date</S.DetailLabel>
              <S.DetailValue>
                {new Date(currentApplication.created_at).toLocaleDateString()}
              </S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Last Updated</S.DetailLabel>
              <S.DetailValue>
                {new Date(currentApplication.updated_at).toLocaleDateString()}
              </S.DetailValue>
            </S.DetailItem>
          </S.DetailGrid>

          {currentApplication.remarks && (
            <S.Remarks>
              <strong>Admin Remarks:</strong> {currentApplication.remarks}
            </S.Remarks>
          )}
        </S.Section>

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
                  const displayFileName = getDisplayFileName(fileName, 15);
                  return (
                    <S.DocumentItem key={doc.id}>
                      <S.DocumentInfo>
                        <S.DocumentType>{doc.doc_type}</S.DocumentType>
                        <S.DocumentName title={fileName}>
                          {displayFileName}
                        </S.DocumentName>
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
                  const displayFileName = getDisplayFileName(fileName, 15);
                  return (
                    <S.DocumentItem key={doc.id}>
                      <S.DocumentInfo>
                        <S.DocumentType>{doc.doc_type}</S.DocumentType>
                        <S.DocumentName title={fileName}>
                          {displayFileName}
                        </S.DocumentName>
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
                  const displayFileName = getDisplayFileName(fileName, 15);
                  return (
                    <S.DocumentItem key={doc.id}>
                      <S.DocumentInfo>
                        <S.DocumentType>visa</S.DocumentType>
                        <S.DocumentName title={fileName}>
                          {displayFileName}
                        </S.DocumentName>
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

        <S.Section>
          <S.SectionTitle>Application Status Timeline</S.SectionTitle>
          <S.StatusTimeline>
            <S.TimelineItem status="completed">
              <S.TimelineDot />
              <S.TimelineContent>
                <S.TimelineTitle>Application Submitted</S.TimelineTitle>
                <S.TimelineDate>
                  {new Date(currentApplication.created_at).toLocaleDateString()}
                </S.TimelineDate>
              </S.TimelineContent>
            </S.TimelineItem>

            <S.TimelineItem
              status={
                ["approved", "completed", "invoiced"].includes(
                  currentApplication.status
                )
                  ? "completed"
                  : currentApplication.status === "rejected"
                  ? "rejected"
                  : "pending"
              }
            >
              <S.TimelineDot />
              <S.TimelineContent>
                <S.TimelineTitle>
                  {currentApplication.status === "rejected"
                    ? "Application Rejected"
                    : "Under Review"}
                </S.TimelineTitle>
                <S.TimelineDate>
                  {currentApplication.status !== "pending"
                    ? `Updated: ${new Date(
                        currentApplication.updated_at
                      ).toLocaleDateString()}`
                    : "Waiting for admin review"}
                </S.TimelineDate>
                {currentApplication.status === "rejected" &&
                  currentApplication.remarks && (
                    <S.TimelineRemarks>
                      Reason: {currentApplication.remarks}
                    </S.TimelineRemarks>
                  )}
              </S.TimelineContent>
            </S.TimelineItem>

            {currentApplication.status !== "rejected" && (
              <S.TimelineItem
                status={
                  currentApplication.status === "completed"
                    ? "completed"
                    : ["approved", "invoiced"].includes(
                        currentApplication.status
                      )
                    ? "completed"
                    : "pending"
                }
              >
                <S.TimelineDot />
                <S.TimelineContent>
                  <S.TimelineTitle>
                    {currentApplication.status === "completed"
                      ? "Visa Issued"
                      : "Processing Visa"}
                  </S.TimelineTitle>
                  <S.TimelineDate>
                    {currentApplication.status === "completed"
                      ? `Completed: ${new Date(
                          currentApplication.updated_at
                        ).toLocaleDateString()}`
                      : currentApplication.status === "invoiced"
                      ? "Payment received, processing visa"
                      : "Waiting for visa processing"}
                  </S.TimelineDate>
                </S.TimelineContent>
              </S.TimelineItem>
            )}
          </S.StatusTimeline>
        </S.Section>
      </S.Content>

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
