import { useRef, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";

const ImageUploadInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.info("Image only!");
      return;
    }
    toast.success("Image uploaded successfully!");
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Box
        onClick={() => inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        sx={{
          width: "50%",
          border: "2px dashed",
          borderColor: dragOver ? "primary.main" : "primary.light",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          bgcolor: dragOver ? "action.hover" : "transparent",
        }}
      >
        {!preview && (
          <>
            <CloudUploadOutlinedIcon
              sx={{ fontSize: 48, color: "primary.main" }}
            />
            <Typography variant="h6" color="primary">
              Click để upload
            </Typography>
            <Typography variant="body2" color="text.secondary">
              PNG, JPG, JPEG, WEBP
            </Typography>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={onChange}
        />

        {preview && (
          <>
            <Box
              component="img"
              src={preview}
              alt="preview"
              sx={{
                maxWidth: { xs: "100%", sm: "50%" },
                maxHeight: { xs: "100%", sm: "50%" },
                objectFit: "cover",
              }}
            />

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "#fff",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </>
        )}
      </Box>

      {preview && (
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            borderRadius: 2,
            p: 1,
            bgcolor: "action.hover",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>{file?.name}</Typography>
          </Box>

          <IconButton color="error" onClick={removeFile}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploadInput;
