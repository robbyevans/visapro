import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApplications } from "../../redux/hooks/useApplications";
import Spinner from "../../components/Spinner/Spinner";
import * as S from "./styles";

const ApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentApplication, fetchApplication, isLoading } = useApplications();

  useEffect(() => {
    if (id) {
      fetchApplication(parseInt(id));
    }
  }, [id, fetchApplication]);

  if (isLoading || !currentApplication) {
    return (
      <S.ApplicationDetailsContainer>
        <Spinner size="lg" />
      </S.ApplicationDetailsContainer>
    );
  }

  const passportDocuments = currentApplication.documents.filter(
    (doc) => doc.doc_type === "passport"
  );
  const otherDocuments = currentApplication.documents.filter(
    (doc) => doc.doc_type !== "passport" && doc.doc_type !== "visa"
  );
  const visaDocuments = currentApplication.documents.filter(
    (doc) => doc.doc_type === "visa"
  );

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
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#3b82f6",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                    >
                      View Document
                    </a>
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
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#3b82f6",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                    >
                      View Document
                    </a>
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
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#10b981",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Download Visa
                    </a>
                  </S.DocumentItem>
                ))}
              </S.DocumentList>
            </S.DocumentSection>
          )}

          {currentApplication.documents.length === 0 && (
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
