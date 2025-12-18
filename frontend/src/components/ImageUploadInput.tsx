import { useRef, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import PredictDialog from "./PredictResultDialog";
import skincancerDetectApi from "../api/modules/skincancer-detect-api.module";
import type { PredictResponse } from "../type";

const ImageUploadInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const [isRequest, setIsRequest] = useState<boolean>(false);
  const [predictDialogOpen, setPredictDialogOpen] = useState<boolean>(false);
  const [result, setResult] = useState<PredictResponse | null>(null);

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

  const handleSubmitClick = async () => {
    if (isRequest) return;

    if (!file) {
      toast.info("Please upload an image first");
      return;
    }

    setIsRequest(true);

    const formData = new FormData();
    formData.append("file", file);

    const { response, error } = await skincancerDetectApi.getDetect(formData);

    setIsRequest(false);

    if (error) {
      console.error("Detect error:", error);
      toast.error("An error occurred while processing the image");
      setPreview(null);
      setFile(null);
      setDragOver(false);
    }

    if (response) {
      setResult(response);
      setPreview(null);
      setFile(null);
      toast.success("Prediction completed successfully!");
      setDragOver(false);
      setPredictDialogOpen(true);
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Button variant="outlined" onClick={() => handleSubmitClick()}>
          {isRequest ? "Processing..." : "Get result"}
        </Button>
        <Box
          onClick={() => !isRequest && inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          sx={{
            width: { xs: "90%", sm: "50%" },
            height: { xs: "70%", sm: "70%" },
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
                Click to upload
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
                  width: { xs: "100%", sm: "50%" },
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
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

            <IconButton color="error" onClick={removeFile} disabled={isRequest}>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      <PredictDialog
        predictDialogOpen={predictDialogOpen}
        setPredictDialogOpen={setPredictDialogOpen}
        result={result}
      />
    </>
  );
};

export default ImageUploadInput;
