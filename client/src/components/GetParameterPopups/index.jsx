import { GET_ENUMS } from '../../config/config';
import useGetPopupState from '../../utils/useGetPopupState';
import RegisterAndLoginPopup from '../RegisterAndLoginPopup';

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