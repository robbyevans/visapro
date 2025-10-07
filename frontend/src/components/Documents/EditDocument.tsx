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

  return (
    <S.EditDocumentContainer>
      <S.DocumentInfo>
        <S.DocumentIcon>📄</S.DocumentIcon>
        <S.DocumentDetails>
          <S.DocumentName>{fileName}</S.DocumentName>
          <S.DocumentType>{type.replace("_", " ")}</S.DocumentType>
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
