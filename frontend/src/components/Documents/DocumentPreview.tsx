import React, { useState, useEffect } from "react";
import * as S from "./styles";

interface DocumentPreviewProps {
  fileUrl: string;
  fileName: string;
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  fileUrl,
  fileName,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileExtension = fileName.split(".").pop()?.toLowerCase();

  const isImage = () =>
    ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(fileExtension || "");
  const isPDF = () => fileExtension === "pdf";

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Skip the HEAD request entirely - it's causing issues
    // Just proceed to load the document directly
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [fileUrl]);

  const handleOpenInNewTab = () => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <S.PreviewOverlay>
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewTitle>Loading document...</S.PreviewTitle>
            <S.CloseButton onClick={onClose}>×</S.CloseButton>
          </S.PreviewHeader>
          <S.PreviewContent>
            <S.LoadingSpinner>Loading document preview...</S.LoadingSpinner>
          </S.PreviewContent>
        </S.PreviewContainer>
      </S.PreviewOverlay>
    );
  }

  return (
    <S.PreviewOverlay>
      <S.PreviewContainer>
        <S.PreviewHeader>
          <S.PreviewTitle>{fileName}</S.PreviewTitle>
          <S.PreviewActions>
            <S.ActionButton onClick={handleOpenInNewTab}>
              Open in New Tab
            </S.ActionButton>
            <S.ActionButton onClick={handleDownload}>Download</S.ActionButton>
            <S.CloseButton onClick={onClose}>×</S.CloseButton>
          </S.PreviewActions>
        </S.PreviewHeader>

        <S.PreviewContent>
          {isImage() ? (
            <S.ImagePreview
              src={fileUrl}
              alt={fileName}
              onLoad={() => setIsLoading(false)}
              onError={() => setError("Failed to load image")}
            />
          ) : isPDF() ? (
            <S.PDFPreview>
              <object
                data={fileUrl}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Unable to display PDF.{" "}
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    Download instead
                  </a>
                </p>
              </object>
            </S.PDFPreview>
          ) : (
            <S.UnsupportedPreview>
              <p>Preview not available for this file type.</p>
              <p>File type: .{fileExtension}</p>
              <S.ActionButtons>
                <S.PrimaryButton onClick={handleOpenInNewTab}>
                  Open in New Tab
                </S.PrimaryButton>
                <S.SecondaryButton onClick={handleDownload}>
                  Download File
                </S.SecondaryButton>
              </S.ActionButtons>
            </S.UnsupportedPreview>
          )}
        </S.PreviewContent>

        {error && (
          <S.ErrorMessage>
            <p>{error}</p>
            <S.ActionButtons>
              <S.PrimaryButton onClick={handleOpenInNewTab}>
                Open in New Tab
              </S.PrimaryButton>
              <S.SecondaryButton onClick={handleDownload}>
                Download Instead
              </S.SecondaryButton>
            </S.ActionButtons>
          </S.ErrorMessage>
        )}
      </S.PreviewContainer>
    </S.PreviewOverlay>
  );
};

export default DocumentPreview;
