
import React from 'react';

const ProdutosTable = ({ formData, handleAddProduct, handleDeleteProduct, handleProductsAndDocsChange }) => {
    return (
        <div>
            <h2>Produtos</h2>
            <table className="table">
                <tbody>
                    {formData.produtos.map((produto, index) => (
                        <tr key={index} className='container-mt-5'>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <div className="d-flex justify-content-center align-items-center h-100">
                                        <button type="button" className="btn btn-danger" onClick={() => handleDeleteProduct(index)}>
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <td className='row'>
                                        <label htmlFor="Produto" className="form-label">Produto - {index + 1}</label>
                                        <input type="text" className="form-control" name="descricao" value={produto.descricao} onChange={(e) => handleProductsAndDocsChange(e, index)} required />
                                    </td>
                                    <div className="row">
                                        <div className='container mt-3'>
                                            <td className='col-md-2'>
                                                <label htmlFor="unidade" className="form-label">UND. Medida</label>
                                                <select className="form-control" name="unidadeMedida" value={produto.unidadeMedida} onChange={(e) => handleProductsAndDocsChange(e, index)} required>
                                                    <option value="kg">Selecione...</option>
                                                    <option value="kg">Kg</option>
                                                    <option value="g">g</option>
                                                    <option value="L">L</option>
                                                    <option value="mL">mL</option>
                                                </select>
                                            </td>
                                            <td className='col-md-2'>
                                                <label htmlFor="quantidade" className="form-label">QTDE. em Estoque</label>
                                                <input type="number" className="form-control" name="quantidadeEstoque" value={produto.quantidadeEstoque} onChange={(e) => handleProductsAndDocsChange(e, index)} required />
                                            </td>
                                            <td className='col-md-2'>
                                                <label htmlFor="valorUnitario" className="form-label">Valor Unitário</label>
                                                <input type="number" className="form-control" name="valorUnitario" value={produto.valorUnitario} onChange={(e) => handleProductsAndDocsChange(e, index)} required />
                                            </td>
                                            <td className='col-md-2'>
                                                <label htmlFor="valorTotal" className="form-label">Valor Total</label>
                                                <input type="text" className="form-control" name="valorTotal" value={produto.valorTotal} readOnly />
                                            </td>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tr>
                    ))}
                    <button type="button" className="btn btn-primary col-md-12" onClick={handleAddProduct}>
                        Adicionar Produto
                    </button>
                </tbody>
            </table>
        </div>
    );
};

export default ProdutosTable
