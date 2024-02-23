import React from 'react';

const FornecedorForm = ({ formData, handleChange }) => {
    return (
        <div>
 <h1>CADASTRO FORNECEDOR/PRODUTO</h1>

{/* Campos do fornecedor */}
<div className="row">
{/* <form onSubmit={handleSubmit}> */}
<h2>Dados do Fornecedor</h2>

<div className="col-md-6"> {/*canto esquerdo*/}
    {/* Razão Social */}
    <div className="mb-3">
        <label htmlFor="razaoSocial" className="form-label">Razão Social *</label>
        <input type="text" className="form-control" id="razaoSocial" name="razaoSocial" value={formData.razaoSocial} onChange={(e) => handleChange(e)} required />
    </div>
    {/* Nome Fantasia */}
    <div className="mb-3">
        <label htmlFor="nomeFantasia" className="form-label">Nome Fantasia *</label>
        <input type="text" className="form-control" id="nomeFantasia" name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChange} required />
    </div>
     {/* CEP*/}
    <div className="col-md-7">
        <label htmlFor="CEP" className="form-label">CEP *</label>
        <input type="number" className="form-control" id="CEP" name="CEP" value={formData.cep} onChange={handleChange} required />
    </div>

    {/* ENDEREÇO*/}
    <div className="mb-3">
        <label htmlFor="nomeFantasia" className="form-label">Endereço *</label>
        <input type="text" className="form-control" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required />
    </div>
</div>

    <div className="col-md-6" > {/*canto direito*/}
    {/* CNPJ */}
    <div className="mb-3">
        <label htmlFor="razaoSocial" className="form-label">Razão Social *</label>
        <input type="text" className="form-control" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} required />
    </div>
    {/* Insc Estadual */}
    <div className="mb-3">
        <label htmlFor="inscricaoEstadual" className="form-label">Inscrição Estadual</label>
        <input type="text" className="form-control" id="inscricaoEstadual" name="inscricaoEstadual" value={formData.inscricaoEstadual} onChange={handleChange} />
    </div>
     {/* Insc Municipal*/}
    <div className="mb-3">
        <label htmlFor="inscricaoMunicipal" className="form-label">Inscrição Municipal </label>
        <input type="text" className="form-control" id="inscricaoMunicipal" name="inscricaoMunicipal" value={formData.inscricaoMunicipal} onChange={handleChange} />
    </div>

    {/* Número*/}
    <div className="mb-3">
        <label htmlFor="numero" className="form-label">Número *</label>
        <input type="number" className="form-control" id="numero" name="numero" value={formData.numero} onChange={handleChange} required />
    </div>
</div>

{/* Complemento*/}
<div className="mb-3">
    <label htmlFor="complemento" className="form-label">Complemento *</label>
    <input type="text" className="form-control" id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} required />
</div>

<div className="row"> {/*Fila 1 */}
    <div className="col-md-4"> {/*Bairro */}
        <label htmlFor="bairro" className="form-label">Bairro *</label>
        <input type="text" className="form-control" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} required />
    </div>
    <div className="col-md-4"> {/*Municipio */}
        <label htmlFor="municipio" className="form-label">Municipio *</label>
        <input type="text" className="form-control" id="municipio" name="municipio" value={formData.municipio} onChange={handleChange} required />
    </div>
    <div className="col-md-4"> {/*Estado */}
        <label htmlFor="estado" className="form-label">Estado *</label>
        <input type="text" className="form-control" id="estado" name="estado" value={formData.estado} onChange={handleChange} required />
    </div>
</div>

<div className='row'> {/*Fila 2 */}
    <div className="col-md-4"> {/*Contato */}
        <label htmlFor="contato" className="form-label">Nome da pessoa de contato *</label>
        <input type="text" className="form-control" id="contato" name="contato" value={formData.contato} onChange={handleChange} required />
    </div>
    <div className="col-md-4"> {/*Fone */}
        <label htmlFor="telefone" className="form-label">Telefone *</label>
        <input type="tel" className="form-control" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required />
    </div>
    <div className="col-md-4"> {/*Email */}
        <label htmlFor="email" className="form-label">E-mail *</label>
        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
    </div>
</div>


</div>        </div>
    );
};

export default FornecedorForm;
