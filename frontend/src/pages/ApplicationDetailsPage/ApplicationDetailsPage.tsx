import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApplications } from "../../redux/hooks/useApplications";
import { useUser } from "../../redux/hooks/useUser";
import Spinner from "../../components/Spinner/Spinner";
import EditDocument from "../../components/Documents/EditDocument";
import * as S from "./styles";

const ApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentApplication, fetchApplication, isLoading } = useApplications();
  const { currentUser } = useUser();

  useEffect(() => {
    if (id) {
      fetchApplication(parseInt(id));
    }
  }, [id, fetchApplication]);

  // Fix TypeScript error by providing default empty array
  const documents = currentApplication?.documents || [];

  const passportDocuments = documents.filter(
    (doc) => doc.doc_type === "passport"
  );
  const otherDocuments = documents.filter(
    (doc) => doc.doc_type !== "passport" && doc.doc_type !== "visa"
  );
  const visaDocuments = documents.filter((doc) => doc.doc_type === "visa");

  const handleDownloadDocument = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReplaceDocument = async (file: File, documentId: number) => {
    // Implement document replacement logic here
    console.log("Replace document:", documentId, file);
    // You'll need to add a replaceDocument function to your useApplications hook
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
        {/* Application Details */}
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
                {passportDocuments.map((doc) => (
                  <S.DocumentItem key={doc.id}>
                    <S.DocumentInfo>
                      <S.DocumentType>{doc.doc_type}</S.DocumentType>
                      <S.DocumentName>Passport Document</S.DocumentName>
                    </S.DocumentInfo>
                    {canEdit ? (
                      <EditDocument
                        fileName={`passport_${doc.id}.${doc.file_url
                          .split(".")
                          .pop()}`}
                        fileUrl={doc.file_url}
                        onReplace={(file) =>
                          handleReplaceDocument(file, doc.id)
                        }
                        onDownload={() =>
                          handleDownloadDocument(
                            doc.file_url,
                            `passport_${doc.id}`
                          )
                        }
                        type="passport"
                      />
                    ) : (
                      <button
                        onClick={() =>
                          handleDownloadDocument(
                            doc.file_url,
                            `passport_${doc.id}`
                          )
                        }
                        style={{
                          color: "#3b82f6",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "14px",
                          textDecoration: "underline",
                        }}
                      >
                        {isAdmin ? "Preview & Download" : "Download"}
                      </button>
                    )}
                  </S.DocumentItem>
                ))}
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
                {otherDocuments.map((doc) => (
                  <S.DocumentItem key={doc.id}>
                    <S.DocumentInfo>
                      <S.DocumentType>{doc.doc_type}</S.DocumentType>
                      <S.DocumentName>
                        {doc.doc_type
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </S.DocumentName>
                    </S.DocumentInfo>
                    {canEdit && doc.doc_type === "invitation_letter" ? (
                      <EditDocument
                        fileName={`${doc.doc_type}_${doc.id}.${doc.file_url
                          .split(".")
                          .pop()}`}
                        fileUrl={doc.file_url}
                        onReplace={(file) =>
                          handleReplaceDocument(file, doc.id)
                        }
                        onDownload={() =>
                          handleDownloadDocument(
                            doc.file_url,
                            `${doc.doc_type}_${doc.id}`
                          )
                        }
                        type="invitation_letter"
                      />
                    ) : (
                      <button
                        onClick={() =>
                          handleDownloadDocument(
                            doc.file_url,
                            `${doc.doc_type}_${doc.id}`
                          )
                        }
                        style={{
                          color: "#3b82f6",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "14px",
                          textDecoration: "underline",
                        }}
                      >
                        {isAdmin ? "Preview & Download" : "Download"}
                      </button>
                    )}
                  </S.DocumentItem>
                ))}
              </S.DocumentList>
            </S.DocumentSection>
          )}

          {/* Visa Documents */}
          {visaDocuments.length > 0 && (
            <S.DocumentSection>
              <S.DocumentSectionTitle>Visa Documents</S.DocumentSectionTitle>
              <S.DocumentList>
                {visaDocuments.map((doc) => (
                  <S.DocumentItem key={doc.id}>
                    <S.DocumentInfo>
                      <S.DocumentType>visa</S.DocumentType>
                      <S.DocumentName>Visa Document</S.DocumentName>
                    </S.DocumentInfo>
                    <button
                      onClick={() =>
                        handleDownloadDocument(
                          doc.file_url,
                          `visa_${currentApplication.athlete?.first_name}_${currentApplication.athlete?.last_name}`
                        )
                      }
                      style={{
                        color: "#10b981",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                        textDecoration: "underline",
                        fontWeight: "500",
                      }}
                    >
                      Download Visa
                    </button>
                  </S.DocumentItem>
                ))}
              </S.DocumentList>
            </S.DocumentSection>
          )}

          {documents.length === 0 && (
            <S.NoDocuments>
              No documents uploaded for this application yet.
            </S.NoDocuments>
          )}
        </S.Section>

        {/* Status Timeline */}
        <S.Section>
          <S.SectionTitle>Application Status</S.SectionTitle>
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
                ["approved", "completed"].includes(currentApplication.status)
                  ? "completed"
                  : currentApplication.status === "rejected"
                  ? "rejected"
                  : "pending"
              }
            >
              <S.TimelineDot />
              <S.TimelineContent>
                <S.TimelineTitle>Under Review</S.TimelineTitle>
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

            <S.TimelineItem
              status={
                currentApplication.status === "completed"
                  ? "completed"
                  : "pending"
              }
            >
              <S.TimelineDot />
              <S.TimelineContent>
                <S.TimelineTitle>Visa Issued</S.TimelineTitle>
                <S.TimelineDate>
                  {currentApplication.status === "completed"
                    ? `Completed: ${new Date(
                        currentApplication.updated_at
                      ).toLocaleDateString()}`
                    : "Waiting for visa issuance"}
                </S.TimelineDate>
              </S.TimelineContent>
            </S.TimelineItem>
          </S.StatusTimeline>
        </S.Section>
      </S.Content>
    </S.ApplicationDetailsContainer>
  );
};

export default ApplicationDetailsPage;
