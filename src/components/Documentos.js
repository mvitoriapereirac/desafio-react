import React from 'react';

const DocumentosTable = ({ formData, handleAddDocumento, handleDeleteDocument, handleUploadDocument, handleViewDocument, handleProductsAndDocsChange }) => {
    return (
        <div>
<div className='container-mt5'>
        <h2> Anexos</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Arquivo</th>
            </tr>
          </thead>
          <tbody>
            {formData.documentos.map((documento, index) => (
              <tr key={index}>
                <td><input type="text" className="form-control" name="nome" value={documento.nome} onChange={(e) => handleProductsAndDocsChange(e, index, 'documentos')} required /></td>
                <td>
                <input type="file" className="form-control" onChange={(e) => handleUploadDocument(e, index)} required/>
                </td>
                <td> 
            <button type="button" className="btn btn-danger" onClick={() => handleDeleteDocument(index)}>
              Excluir
            </button>
            </td>
            <td>
            <button type="button" className="btn btn-primary see" onClick={() => handleViewDocument(index)}>
              Ver
            </button>
          </td>

              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary col-md-12" onClick={handleAddDocumento}>Adicionar outro anexo</button>

        {/* Botão de submit */}


        </div>
    </div>
    );
};

export default DocumentosTable;