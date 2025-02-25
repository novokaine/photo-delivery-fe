import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

interface DialogModalType {
  isOpen: boolean;
  dialogText: string;
  dialogTitle?: string;
  buttonText?: string;
  handleClose: () => void;
}

const DialogModal = ({
  isOpen,
  dialogTitle,
  dialogText,
  buttonText = "Try again",
  handleClose
}: DialogModalType) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent className="myDialog">
        <DialogContentText>{dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          fullWidth
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
