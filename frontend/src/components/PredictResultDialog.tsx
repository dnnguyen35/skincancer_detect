import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import type { PredictResultDialogProps } from "../type";
import { DiseaseLabel } from "../type";

const PredictResultDialog = ({
  predictDialogOpen,
  setPredictDialogOpen,
  result,
}: PredictResultDialogProps) => {
  return (
    <Dialog
      open={predictDialogOpen}
      onClose={setPredictDialogOpen}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Prediction Result</DialogTitle>

      <DialogContent>
        {result && (
          <>
            <Typography>
              Label:{" "}
              <b>
                {result.stage2_result
                  ? DiseaseLabel[
                      result.stage2_result
                        .class_name as keyof typeof DiseaseLabel
                    ]
                  : DiseaseLabel[
                      result.stage1_result
                        .class_name as keyof typeof DiseaseLabel
                    ]}
              </b>
            </Typography>
            <Typography>
              Message: <b>{result.message}</b>
            </Typography>
            <Typography>
              Confidence:{" "}
              {(result.stage2_result
                ? result.stage2_result.confidence * 100
                : result.stage1_result.confidence * 100
              ).toFixed(2)}
              %
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setPredictDialogOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PredictResultDialog;
