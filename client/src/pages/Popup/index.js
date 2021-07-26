import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import GetParameterPopups from "../../components/GetParameterPopups/GetParameterPopups.jsx";

const Popup = () => {
    return (
        <GetParameterPopups />
    );
};

export default Popup;