// LoadingModal.js

import React from 'react';

const LoadingModal = ({ show }) => {
    return (
        show && (
            <div className="loading-modal">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        )
    );
};

export default LoadingModal;
