import React, { useCallback, useState, useRef, useEffect } from "react";
import * as S from "./styles";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
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
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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

  const startCamera = async () => {
    try {
      setError("");
      setIsCameraLoading(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      streamRef.current = stream;
      setIsCameraActive(true);

      // Wait for the next render cycle to ensure video element is available
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(console.error);
            setIsCameraLoading(false);
          };
        }
      }, 100);
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
      console.error("Camera error:", err);
      setIsCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setIsCameraLoading(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !streamRef.current) {
      setError("Camera not ready. Please try again.");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;

      // Ensure video has valid dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        setError("Camera feed not available. Please try again.");
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File(
                [blob],
                `camera-capture-${Date.now()}.jpg`,
                {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }
              );

              console.log("Captured photo:", file.name, file.size, file.type);
              handleFile(file);
              stopCamera();
            } else {
              setError("Failed to capture photo. Please try again.");
            }
          },
          "image/jpeg",
          0.9
        );
      }
    } catch (error) {
      console.error("Capture error:", error);
      setError("Failed to capture photo. Please try again.");
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <S.FileDropzoneContainer className={className}>
      {!isCameraActive ? (
        <>
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

          {/* Camera Upload Button - Separate from dropzone */}
          <S.CameraButtonContainer>
            <S.CameraButton
              type="button"
              onClick={startCamera}
              disabled={disabled || isCameraLoading}
            >
              <S.CameraIcon>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </S.CameraIcon>
              {isCameraLoading ? "Loading Camera..." : "Take Photo"}
            </S.CameraButton>
          </S.CameraButtonContainer>
        </>
      ) : (
        <S.CameraContainer>
          {isCameraLoading && (
            <S.CameraLoading>Initializing camera...</S.CameraLoading>
          )}
          <S.CameraVideo
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onError={() => setError("Failed to load camera feed")}
          />
          <S.CameraControls>
            <S.CameraButton
              type="button"
              onClick={capturePhoto}
              $variant="primary"
              disabled={isCameraLoading}
            >
              <S.CaptureIcon>
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </S.CaptureIcon>
              Capture
            </S.CameraButton>
            <S.CameraButton
              type="button"
              onClick={stopCamera}
              $variant="secondary"
              disabled={isCameraLoading}
            >
              Cancel
            </S.CameraButton>
          </S.CameraControls>
        </S.CameraContainer>
      )}

      {error && <S.DropzoneError>{error}</S.DropzoneError>}
    </S.FileDropzoneContainer>
  );
};

export default FileDropzone;
