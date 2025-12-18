import type { JSX } from "react";

export const DiseaseLabel = {
  benign: "Benign (no cancer)",
  nv: "Nevus (low)",
  bkl: "Benign Keratosis (low)",
  df: "Dermatofibroma (low)",
  vasc: "Vascular lesion (low)",
  akiec: "Actinic Keratoses (medium)",
  bcc: "Basal Cell Carcinoma (medium)",
  mel: "Melanoma (high)",
};

export type Route = {
  index?: boolean;
  path?: string;
  element: JSX.Element;
  state?: string;
};

export type ClassificationResult = {
  class_id: number;
  class_name: string;
  confidence: number;
};

export type PredictResponse = {
  stage: 1 | 2;
  has_disease: boolean;
  message: string;
  stage1_result: ClassificationResult;
  stage2_result?: ClassificationResult;
  time_ms: number;
};

export type PredictResultDialogProps = {
  predictDialogOpen: boolean;
  setPredictDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  result: PredictResponse | null;
};
