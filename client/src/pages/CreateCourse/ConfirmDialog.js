import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button
} from '@material-ui/core';

const ConfirmDialog = ({ open, onChoose, content }) => {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onChoose(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onChoose(true)} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfirmDialog;