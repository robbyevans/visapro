import React from "react";
import Button from "../Button/Button";
import * as S from "./styles";

interface EditDocumentProps {
  fileName: string;
  fileUrl: string;
  onReplace: (file: File) => void;
  onDownload: () => void;
  type: "passport" | "invitation_letter" | "visa";
}

const EditDocument: React.FC<EditDocumentProps> = ({
  fileName,
  // fileUrl,
  onReplace,
  onDownload,
  type,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onReplace(file);
    }
  };

  // FIXED: Function to truncate file name for display
  const getDisplayFileName = (fileName: string, maxLength: number = 20) => {
    if (!fileName) return "";

    // Decode URL-encoded characters first
    const decodedFileName = decodeURIComponent(fileName);

    // Remove file extension for display purposes
    const nameWithoutExtension = decodedFileName.replace(/\.[^/.]+$/, "");

    if (nameWithoutExtension.length <= maxLength) {
      return decodedFileName;
    }

    // Truncate and add ellipsis
    const truncatedName = nameWithoutExtension.substring(0, maxLength) + "...";
    const extension = decodedFileName.split(".").pop();

    return `${truncatedName}.${extension}`;
  };

  const displayFileName = getDisplayFileName(fileName, 20);
  const formattedType = type.replace("_", " ");

  return (
    <S.EditDocumentContainer>
      <S.DocumentInfo>
        <S.DocumentIcon>📄</S.DocumentIcon>
        <S.DocumentDetails>
          <S.DocumentName title={fileName}>{displayFileName}</S.DocumentName>
          <S.DocumentType>{formattedType}</S.DocumentType>
        </S.DocumentDetails>
      </S.DocumentInfo>
      <S.DocumentActions>
        <Button variant="secondary" size="sm" onClick={onDownload}>
          Download
        </Button>
        <S.ReplaceButton>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          Replace
        </S.ReplaceButton>
      </S.DocumentActions>
    </S.EditDocumentContainer>
  );
};

export default EditDocument;
