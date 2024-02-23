// src/components/Formulario.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingModal from '../components/LoadingModal'; // Import the loading modal component


const Formulario = () => {
  const [formData, setFormData] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    endereco: '',
    numero: '',
    complemento: '',
    cep: '',
    contato: '',
    telefone: '',
    email: '',
    descricao: '',
    unidadeMedida: '',
    quantidadeEstoque: '',
    valorUnitario: '',
    valorTotal: '',
    documentos: [{ nome: '', arquivo: '' }],
    produtos: [{ descricao: '', unidadeMedida: '', quantidadeEstoque: '', valorUnitario: '', valorTotal: '' }],
  });

  const [showLoadingModal, setShowLoadingModal] = useState(false);



const handleChange = async (e, index, type) => {
    const { name, value } = e.target;
    const newData = { ...formData };

    newData[name] = value;
    console.log(name)
    console.log(value)

    if (name === 'cep' || name === 'CEP') {
        console.log(value);

        if (value.length <= 8) {
            // Update formData.cep if the length of the value is less than or equal to 8
            newData.cep = value;
        }

        if (value.length === 8) {
            try {
                const endereco = await handleCEP(value);
                console.log("entrei aq" + JSON.stringify(endereco));
                // Update the state with the endereco data
                newData.endereco = endereco.logradouro;
                newData.bairro = endereco.bairro;
                newData.municipio = endereco.localidade;
                newData.estado = endereco.uf;
                newData.complemento = endereco.complemento;
                setFormData(newData);
            } catch(error) {
                console.error('Error fetching CEP:', error);
            }
        }
    }

    // Handle other form fields here if needed

    setFormData(newData);
};


  const handleProductsAndDocsChange = (e, index, type) => {
    const { name, value, files } = e.target;
    const newData = { ...formData };
  
    if (type && type === 'documentos') {
      const newDocumentos = [...formData.documentos];
      if (name === 'arquivo') {
        newDocumentos[index][name] = files[0].name;
      } else {
        newDocumentos[index][name] = value;
      }
      newData.documentos = newDocumentos;
    } else {
        const newProdutos = [...formData.produtos];
        newProdutos[index][name] = value;
    
      console.log(value);

       // Calculate total value
    const quantidadeEstoque = parseFloat(newProdutos[index].quantidadeEstoque);
    const valorUnitario = parseFloat(newProdutos[index].valorUnitario);
    const valorTotal = quantidadeEstoque * valorUnitario;
    newProdutos[index].valorTotal = isNaN(valorTotal) ? '' : valorTotal.toFixed(2);

    newData.produtos = newProdutos;
    }
    
    setFormData(newData);
  };
  

  const handleAddDocumento = () => {
    setFormData({
      ...formData,
      documentos: [...formData.documentos, { nome: '', arquivo: '' }],
    });
  };




const handleCEP = (CEP) => {
    return fetch(`https://viacep.com.br/ws/${CEP}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Dados retornados pela API
            return data; // Return the data to be used later
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            throw error; // Re-throw the error to be handled later
        });
};

const handleAddProduct = () => {
    // Calculate the total value of the product
    const newProduct = {
      descricao: '',
      unidadeMedida: '',
      quantidadeEstoque: '',
      valorUnitario: '',
      valorTotal: '', // This will be calculated
    };
  
    const newData = {
      ...formData,
      produtos: [...formData.produtos, newProduct],
    };
  
    setFormData(newData);
  };

  const handleDeleteProduct = (index) => {
    const newProdutos = [...formData.produtos];
    newProdutos.splice(index, 1); // Remove the product at the specified index
  
    const newData = {
      ...formData,
      produtos: newProdutos,
    };
  
    setFormData(newData);
  };

// Function to handle uploading a document
const handleUploadDocument = (e, index) => {
    const { files } = e.target;
    
    // Check if files are selected
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const documentBlob = new Blob([reader.result], { type: file.type }); // Create a Blob from the file content

            const documentData = {
                nome: file.name,
                arquivo: documentBlob, // Store the Blob
            };

            const newDocumentos = [...formData.documentos];
            newDocumentos[index] = documentData;

            // Store the document data in session storage
            sessionStorage.setItem(`documentData_${index}`, JSON.stringify(documentData));

            setFormData({ ...formData, documentos: newDocumentos });
        };

        reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    } else {
        console.error('No file selected.');
    }
};

  

  // Function to handle deleting a document
  const handleDeleteDocument = (index) => {
    const newDocumentos = [...formData.documentos];
    newDocumentos.splice(index, 1);

    // Remove the document from session storage
    sessionStorage.removeItem(`documentBlob_${index}`);
    sessionStorage.removeItem(`documentMetadata_${index}`);

    setFormData({ ...formData, documentos: newDocumentos });
  };

  // Function to handle viewing a document
  const handleViewDocument = (index) => {
    const documento = formData.documentos[index];
    const file = documento.arquivo;

    // Check if file is present
    if (file) {
        // Create a Blob object from the file
        const blob = new Blob([file], { type: file.type });

        // Create a URL for the Blob object
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up by revoking the object URL
        URL.revokeObjectURL(url);
    } else {
        console.error('File not found.');
    }
};



  // Modified handleSubmit function to handle saving supplier
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.produtos.length > 1 && formData.documentos.length > 1) {
        alert('Please add at least one product and one document.');
        console.log("nao é maior q um")
        console.log(formData.produtos)
        console.log(formData.documentos)

        return;
      }

    // Show loading modal
    setShowLoadingModal(true);

    // You need to implement your own logic to show a loading modal here

    // Format the supplier data as JSON
    const supplierDataJSON = JSON.stringify(formData);
    console.log('Supplier Form Data JSON:', supplierDataJSON);

    // Create a Blob object containing the JSON data
    const blob = new Blob([supplierDataJSON], { type: 'application/json' });

    // Create a download link for the Blob
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'supplierData.json';

    // Simulate clicking the download link
    link.click();

    // Optionally, you can display a success message
    console.log('Form data downloaded successfully!');

    // Hide loading modal
    // You need to implement your own logic to hide the loading modal here
};


  

  return (
    <div className="container mt-5">
      <h1>CADASTRO FORNECEDOR/PRODUTO</h1>
      <form onSubmit={handleSubmit}>
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
                <input type="text" className="form-control" id="CEP" name="CEP" value={formData.cep} onChange={handleChange} required />
            </div>

            {/* ENDEREÇO*/}
            <div className="mb-3">
                <label htmlFor="nomeFantasia" className="form-label">ENDEREÇO *</label>
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
        

    </div>
        {/* Tabela de Produtos */}
        <h2>Produtos</h2>
        <table className="table">
          <tbody>
            {formData.produtos.map((produto, index) => (
              <tr key={index} className='container-mt-5'>
                  <div className='row'>
                  <div className='col-md-2'>
                    <button type="button" className="btn btn-danger" onClick={() => handleDeleteProduct(index)}>
                        Delete
                    </button>

                  </div>
                <div className="col-md-10">
                <td className='row'>
                    <label htmlFor="Produto" className="form-label">Produto - {index + 1}</label>
                    <input type="text" className="form-control" name="descricao" value={produto.descricao} onChange={(e) => handleProductsAndDocsChange(e, index)} />
                </td>
               <div className="row">
               <div className='container mt-3'>
               <td className='col-md-2'>
                    <label htmlFor="unidade" className="form-label">UND. Medida</label>
                    <select className="form-control" name="unidadeMedida" value={produto.unidadeMedida} onChange={(e) => handleProductsAndDocsChange(e, index)}>
                        <option value="kg">Selecione...</option>
                        <option value="kg">Kg</option>
                        <option value="g">g</option>
                        <option value="L">L</option>
                        <option value="mL">mL</option>
                    </select>
                </td>
                
                <td className='col-md-2'>
                    <label htmlFor="quantidade" className="form-label">QTDE. em Estoque</label>
                    <input type="number" className="form-control" name="quantidadeEstoque" value={produto.quantidadeEstoque} onChange={(e) => handleProductsAndDocsChange(e, index)} />
                    </td>
                <td className='col-md-2'>
                    <label htmlFor="valorUnitario" className="form-label">Valor Unitário</label>
                    <input type="number" className="form-control" name="valorUnitario" value={produto.valorUnitario} onChange={(e) => handleProductsAndDocsChange(e, index)} />
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
        
          
        {/* Formulário de Produtos */}



        {/* Tabela de Anexos */}
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
                <td><input type="text" className="form-control" name="nome" value={documento.nome} onChange={(e) => handleProductsAndDocsChange(e, index, 'documentos')} /></td>
                <td>
                <input type="file" className="form-control" onChange={(e) => handleUploadDocument(e, index)} />

                    {/* <input type="file" className="form-control" name="arquivo" onChange={(e) => handleProductsAndDocsChange(e, index, 'documentos')} /> */}
                </td>
                <td> {/* Add this table data for the delete button */}
            <button type="button" className="btn btn-danger" onClick={() => handleDeleteDocument(index)}>
              Excluir
            </button>
            <button type="button" className="btn btn-primary" onClick={() => handleViewDocument(index)}>
              Ver documento
            </button>
          </td>

              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary" onClick={handleAddDocumento}>Incluir Anexo</button>

        {/* Botão de submit */}

        <button type="submit" className="btn btn-primary col-md-12" onClick={handleSubmit}>Salvar Fornecedor</button>

        </div>
        
      </form>
      <LoadingModal show={showLoadingModal} />

    </div>
  );
};

export default Formulario;
