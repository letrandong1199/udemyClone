import { GET_ENUMS, GET_PARAMS } from '../../config/config';
import useGetPopupState from '../../utils/useGetPopupState';
import RegisterAndLoginPopup from '../RegisterAndLoginPopup/RegisterAndLoginPopup.jsx';

const popups = {
    [GET_ENUMS.popup.signIn]: RegisterAndLoginPopup,
    [GET_ENUMS.popup.signUp]: RegisterAndLoginPopup,
}

const GetParameterPopups = () => {
    const { mountedPopup, isOpened } = useGetPopupState();
    const Component = popups[mountedPopup]
    if (!Component) {
        return null;
    }
    return <Component isOpened={isOpened} tab={mountedPopup} />;
}

export default GetParameterPopups;