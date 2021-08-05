import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button
} from '@material-ui/core';

const ConfirmDialog = ({ open, setOpen }) => {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Please check your email inbox."}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Verification account
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfirmDialog;