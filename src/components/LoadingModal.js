import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/LoadingModal.css'

const LoadingModal = () => {
    return (
        <div className="modal fade" id="loadingModal" tabIndex="-1" aria-labelledby="loadingModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    // <div class="modal" id="modal-loading" data-backdrop="static">
    //     <div class="modal-dialog modal-sm">
    //         <div class="modal-content">
    //         <div class="modal-body text-center">
    //             <div class="loading-spinner mb-2"></div>
    //             <div>Carregando</div>
    //         </div>
    //         </div>
    //     </div>
// </div>
    );
};

export default LoadingModal;
