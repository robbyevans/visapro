import React, { useCallback, useState, useRef } from "react";
import * as S from "./styles";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in bytes
  label?: string;
  disabled?: boolean;
  className?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelect,
  accept = "*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  label = "Drop file here or click to browse",
  disabled = false,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return false;
    }

    // Validate file type if accept is specified
    if (accept !== "*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      const isValidType = acceptedTypes.some(
        (type) =>
          type.toLowerCase().includes(fileExtension) || type.includes(file.type)
      );

      if (!isValidType) {
        setError(`File type not allowed. Accepted types: ${accept}`);
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect, maxSize, accept]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile, disabled]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
        // Reset the input to allow selecting the same file again
        e.target.value = "";
      }
    },
    [handleFile, disabled]
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  return (
    <S.FileDropzoneContainer className={className}>
      <S.DropzoneArea
        isDragging={isDragging}
        disabled={disabled}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <S.FileInput
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          disabled={disabled}
        />
        <S.DropzoneContent>
          <S.DropzoneIcon>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </S.DropzoneIcon>
          <S.DropzoneText>{label}</S.DropzoneText>
          <S.DropzoneHint>
            Supports: PDF, JPG, JPEG, PNG (Max 5MB)
          </S.DropzoneHint>
        </S.DropzoneContent>
      </S.DropzoneArea>
      {error && <S.DropzoneError>{error}</S.DropzoneError>}
    </S.FileDropzoneContainer>
  );
};

export default FileDropzone;
