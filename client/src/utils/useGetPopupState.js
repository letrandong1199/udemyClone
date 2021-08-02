import useGetParameter from './useGetParameter';
import { GET_PARAMS } from '../config/config';
import { useState, useEffect, useMemo } from 'react';

let timeout;
const useGetPopupState = () => {
    const popupName = useGetParameter(GET_PARAMS.popup);
    const [mountedPopup, setMountedPopup] = useState(popupName);

    useEffect(() => {
        if (popupName) {
            timeout && clearTimeout(timeout);
            setMountedPopup(popupName);
        } else {
            timeout = setTimeout(() => setMountedPopup(null), 200);
        }
    }, [popupName]);

    const isOpened = useMemo(() => Boolean(popupName), [popupName]);

    return { mountedPopup, isOpened };
}

export default useGetPopupState;