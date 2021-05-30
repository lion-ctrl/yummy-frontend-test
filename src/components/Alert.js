import React from 'react'
import PropTypes from "prop-types";

const Alert = ({alert}) => {
    return (
        <div className={`alert ${alert.type}`}>
            {alert.message}
        </div>
    )
}

export default Alert;

Alert.propTypes = {
    alert: PropTypes.object.isRequired
}