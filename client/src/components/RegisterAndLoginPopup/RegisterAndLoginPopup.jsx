import RegisterAndLogin from "../RegisterAndLogin/RegisterAndLogin";
import Popover from '@material-ui/core/Popover';
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";

const RegisterAndLoginPopup = ({ isOpened, tab }) => {
    const classes = useStyles();
    const history = useHistory();


    const handleLogin = () => {
        return history.goBack();
    }

    return (
        <Popover
            id={tab}
            open={isOpened}
            anchorReference="none"
            onClose={history.goBack}
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
            <RegisterAndLogin handleLogin={handleLogin} tab={tab} />
        </Popover>
    )
}

export default RegisterAndLoginPopup;