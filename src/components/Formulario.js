// src/components/Formulario.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingModal from './LoadingModal'; 
import FornecedorForm from './Fornecedor';
import ProdutosTable from './Produto';
import DocumentosTable from './Documentos';
import '../styles/Formulario.css'; 
import '../styles/LoadingModal.css'; // Import the loading modal CSS file



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
            newData.cep = value;
        }

        if (name === 'CEP' && value.length === 8) {
            try {
                const endereco = await handleCEP(value);
                console.log("entrei aq" + JSON.stringify(endereco));
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
            return data; 
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            throw error;
        });
};

const handleAddProduct = () => {
 
    const newProduct = {
      descricao: '',
      unidadeMedida: '',
      quantidadeEstoque: '',
      valorUnitario: '',
      valorTotal: '', 
    };
  
    const newData = {
      ...formData,
      produtos: [...formData.produtos, newProduct],
    };
  
    setFormData(newData);
  };

  const handleDeleteProduct = (index) => {
    const newProdutos = [...formData.produtos];
    newProdutos.splice(index, 1); 
  
    const newData = {
      ...formData,
      produtos: newProdutos,
    };
  
    setFormData(newData);
  };

const handleUploadDocument = (e, index) => {
    const { files } = e.target;
    
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const documentBlob = new Blob([reader.result], { type: file.type }); //Esse dado serve para permitir que o usuario visualize o documento e nao sua versao encriptada ao clicar em "ver"
            const base64String = reader.result; //A FAZER: usar esse valor para popular o formData


            const documentData = {
                nome: file.name,
                arquivo: documentBlob, 
            };

            const newDocumentos = [...formData.documentos];
            newDocumentos[index] = documentData;

            sessionStorage.setItem(`documentData_${index}`, JSON.stringify(documentData));

            setFormData({ ...formData, documentos: newDocumentos });
        };

        reader.readAsArrayBuffer(file); 
    } else {
        console.error('No file selected.');
    }
};


  const handleDeleteDocument = (index) => {
    const newDocumentos = [...formData.documentos];
    newDocumentos.splice(index, 1);

    sessionStorage.removeItem(`documentBlob_${index}`);
    sessionStorage.removeItem(`documentMetadata_${index}`);

    setFormData({ ...formData, documentos: newDocumentos });
  };

  const handleViewDocument = (index) => {
    const documento = formData.documentos[index];
    const file = documento.arquivo;

    if (file) {
        const blob = new Blob([file], { type: file.type });

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;

        link.click();

        URL.revokeObjectURL(url);
    } else {
        console.error('File not found.');
    }
};




const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoadingModal(true);

    if (formData.produtos.length < 1 || formData.documentos.length < 1) {
        alert('Por favor adicione pelo menos um produto e um documento.');
        console.log(formData.produtos.length)

        console.log(formData.documentos.length)
        return;
    }
    console.log(formData.produtos.length)

    console.log(formData.documentos.length)

    try {
        const supplierDataJSON = JSON.stringify(formData);
        console.log('Supplier Form Data JSON:', supplierDataJSON);

        const blob = new Blob([supplierDataJSON], { type: 'application/json' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'supplierData.json';

        link.click();

        console.log('Form data downloaded successfully!');
    } catch (error) {
        console.error('Error submitting form:', error);
    } finally {
    }

};

  

  return (
    <div className="container mt-5 formulario">
      <form onSubmit={handleSubmit} className="formulario">
            <FornecedorForm className="form-component" formData={formData} handleChange={handleChange} />
            <ProdutosTable className="form-component" formData={formData} handleAddProduct={handleAddProduct} handleDeleteProduct={handleDeleteProduct} handleProductsAndDocsChange={handleProductsAndDocsChange} />
            <DocumentosTable className="form-component" formData={formData} handleAddDocumento={handleAddDocumento} handleDeleteDocument={handleDeleteDocument} handleUploadDocument={handleUploadDocument} handleViewDocument={handleViewDocument} handleProductsAndDocsChange={handleProductsAndDocsChange} />
             <button type="submit" className="btn btn-primary col-md-12">Salvar Fornecedor</button>

      </form>
      <LoadingModal show={showLoadingModal} />

    </div>
  );
};

export default Formulario;
