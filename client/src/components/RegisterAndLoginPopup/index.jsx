import RegisterAndLogin from "../RegisterAndLogin";
import Popover from '@material-ui/core/Popover';
import { useStyles } from "./styles";
import { useHistory, useLocation } from "react-router-dom";

const RegisterAndLoginPopup = ({ isOpened, tab }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const handleClose = () => {
        let searchParams = new URLSearchParams(location.search);
        searchParams.delete('auth');
        history.push({ pathname: location.pathname, search: searchParams.toString() });
    }

    return (
        <Popover
            id={tab}
            open={isOpened}
            anchorReference="none"
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            className={classes.popoverRegisterAndLogin}
        >
            <RegisterAndLogin defaultTab={tab} handleClose={handleClose} />
        </Popover>
    )
}

export default RegisterAndLoginPopup;