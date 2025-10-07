import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApplications } from "../../redux/hooks/useApplications";
import { useUser } from "../../redux/hooks/useUser";
import Spinner from "../../components/Spinner/Spinner";
import * as S from "./styles";

const AdminApplicationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentApplication,
    fetchApplication,
    updateApplication,
    uploadDocument,
    isLoading,
  } = useApplications();
  const { currentUser } = useUser();

  const [remarks, setRemarks] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      fetchApplication(parseInt(id));
    }
  }, [id, fetchApplication]);

  const handleStatusUpdate = async (status: string) => {
    if (!id) return;

    const updates: any = { status };
    if (remarks) updates.remarks = remarks;

    await updateApplication(parseInt(id), updates);

    // Refresh application data
    fetchApplication(parseInt(id));
  };

  const handleVisaUpload = async () => {
    if (!id || !selectedFile) return;

    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("application_id", id);
    formData.append("doc_type", "visa");

    await uploadDocument(parseInt(id), formData);
    setSelectedFile(null);

    // Refresh application data
    fetchApplication(parseInt(id));
  };

  const handleDownloadDocument = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviewDocument = (fileUrl: string) => {
    // Open in new tab for preview
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

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

  if (!currentUser || currentUser.role !== "admin") {
    return <div>Access denied. Admin only.</div>;
  }

  if (isLoading || !currentApplication) {
    return (
      <S.AdminApplicationContainer>
        <Spinner size="lg" />
      </S.AdminApplicationContainer>
    );
  }

  const userDocuments = currentApplication?.documents.filter(
    (doc) => doc.doc_type !== "visa"
  );
  const visaDocuments = currentApplication?.documents.filter(
    (doc) => doc.doc_type === "visa"
  );

  return (
    <S.AdminApplicationContainer>
      <S.Header>
        <S.BackButton onClick={() => navigate("/admin/dashboard")}>
          ← Back to Dashboard
        </S.BackButton>
        <S.PageTitle>Application #{currentApplication.id}</S.PageTitle>
      </S.Header>

      <S.Content>
        <S.Section>
          <S.SectionTitle>Application Details</S.SectionTitle>
          <S.DetailGrid>
            <S.DetailItem>
              <S.DetailLabel>Applicant</S.DetailLabel>
              <S.DetailValue>
                {currentApplication.athlete?.first_name}{" "}
                {currentApplication.athlete?.last_name}
              </S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Country</S.DetailLabel>
              <S.DetailValue>{currentApplication.country}</S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Status</S.DetailLabel>
              <S.StatusBadge status={currentApplication.status}>
                {currentApplication.status}
              </S.StatusBadge>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Submitted</S.DetailLabel>
              <S.DetailValue>
                {new Date(currentApplication.created_at).toLocaleDateString()}
              </S.DetailValue>
            </S.DetailItem>
          </S.DetailGrid>

          {currentApplication.remarks && (
            <S.Remarks>
              <strong>Remarks:</strong> {currentApplication.remarks}
            </S.Remarks>
          )}
        </S.Section>

        <S.Section>
          <S.SectionTitle>Documents</S.SectionTitle>
          <S.DocumentsGrid>
            <S.DocumentSection>
              <h3>Applicant Documents</h3>
              <S.DocumentList>
                {userDocuments.map((doc) => (
                  <S.DocumentItem key={doc.id}>
                    <S.DocumentInfo>
                      <S.DocumentType>{doc.doc_type}</S.DocumentType>
                      <S.DocumentName>
                        {getFileNameFromUrl(doc.file_url, doc.doc_type, doc.id)}
                      </S.DocumentName>
                    </S.DocumentInfo>
                    <S.DocumentActions>
                      <S.PreviewButton
                        onClick={() => handlePreviewDocument(doc.file_url)}
                      >
                        Preview
                      </S.PreviewButton>
                      <S.DownloadButton
                        onClick={() =>
                          handleDownloadDocument(
                            doc.file_url,
                            getFileNameFromUrl(
                              doc.file_url,
                              doc.doc_type,
                              doc.id
                            )
                          )
                        }
                      >
                        Download
                      </S.DownloadButton>
                    </S.DocumentActions>
                  </S.DocumentItem>
                ))}
              </S.DocumentList>
            </S.DocumentSection>

            <S.DocumentSection>
              <h3>Visa Documents</h3>
              <S.UploadControls>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <button
                  onClick={handleVisaUpload}
                  disabled={!selectedFile}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: selectedFile ? "#3b82f6" : "#9ca3af",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: selectedFile ? "pointer" : "not-allowed",
                  }}
                >
                  Upload Visa
                </button>
              </S.UploadControls>

              <S.DocumentList>
                {visaDocuments.map((doc) => (
                  <S.DocumentItem key={doc.id}>
                    <S.DocumentInfo>
                      <S.DocumentType>visa</S.DocumentType>
                      <S.DocumentName>
                        {getFileNameFromUrl(doc.file_url, doc.doc_type, doc.id)}
                      </S.DocumentName>
                    </S.DocumentInfo>
                    <S.DocumentActions>
                      <S.PreviewButton
                        onClick={() => handlePreviewDocument(doc.file_url)}
                      >
                        Preview
                      </S.PreviewButton>
                      <S.DownloadButton
                        onClick={() =>
                          handleDownloadDocument(
                            doc.file_url,
                            getFileNameFromUrl(
                              doc.file_url,
                              doc.doc_type,
                              doc.id
                            )
                          )
                        }
                      >
                        Download
                      </S.DownloadButton>
                    </S.DocumentActions>
                  </S.DocumentItem>
                ))}
              </S.DocumentList>
            </S.DocumentSection>
          </S.DocumentsGrid>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Admin Actions</S.SectionTitle>
          <S.AdminActions>
            <S.RemarksInput>
              <label>Remarks:</label>
              <S.TextArea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks for the applicant..."
                rows={3}
              />
            </S.RemarksInput>

            <S.StatusButtons>
              <S.StatusButton
                variant="approve"
                onClick={() => handleStatusUpdate("approved")}
              >
                Approve Application
              </S.StatusButton>
              <S.StatusButton
                variant="reject"
                onClick={() => handleStatusUpdate("rejected")}
              >
                Reject Application
              </S.StatusButton>
              <S.StatusButton
                variant="complete"
                onClick={() => handleStatusUpdate("completed")}
                disabled={visaDocuments.length === 0}
              >
                Mark as Completed
              </S.StatusButton>
            </S.StatusButtons>
          </S.AdminActions>
        </S.Section>
      </S.Content>
    </S.AdminApplicationContainer>
  );
};

export default AdminApplicationPage;
