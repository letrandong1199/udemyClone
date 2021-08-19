import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    Typography,
    Grid
} from '@material-ui/core';
import { ReactComponent as NewUserSvg } from '../../svgs/new-user.svg'


export const ConfirmDialog = ({ open, setOpen }) => {
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

export const SuccessForm = () => {
    return (
        <Grid
            container
            alignItems="center"
            style={{ justifyContent: 'center' }}
            direction='column'
            spacing={2}
        >
            <Typography variant='h4' style={{ alignText: 'center' }}>
                Congratulations!
            </Typography>
            <Typography
                variant='subtitle1'
                style={{
                    alignText: 'center',
                    marginBottom: 16,
                }}>
                Last step. Please check your email for account verification
            </Typography>
            <NewUserSvg
                style={{
                    maxWidth: 300,
                    maxHeight: 250
                }}
            />

        </Grid>

    )
}

export default ConfirmDialog;