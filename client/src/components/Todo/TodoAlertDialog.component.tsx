import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogProps {
  loading?: boolean;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function TodoAlertDialog(props: AlertDialogProps) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Aye you sure?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this todo permanently?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        
        <Button onClick={props.handleClose} variant="contained" color="success" disabled={props.loading}>Disagree</Button>
        <Button onClick={props.handleConfirm} variant="contained" autoFocus color="error" disabled={props.loading}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
