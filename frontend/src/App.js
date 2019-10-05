import React, { useEffect, useState } from 'react';
import Produto from './Produto';
import axios from 'axios';

export default function App() {
  let [nomeProduto, setNomeProduto] = useState('');
  let [descricaoProduto, setDescricaoProduto] = useState('');

  let [produtos, setProdutos] = useState([]);
  
  async function loadProdutos() {
    setProdutos(await axios.get('http://localhost:8000/produtos').then(res => res.data));
  }

  async function adicionarProduto(nome, descricao) {
    await axios.post('http://localhost:8000/produtos', {
      nome,
      descricao,
    });

    setNomeProduto('');
    setDescricaoProduto('');
    loadProdutos();
  }

  async function excluirProduto(id) {
    await axios.delete('http://localhost:8000/produtos/' + id);

    loadProdutos();
  }

  useEffect(() => {
      loadProdutos();
  }, []);

  return (
    <div className="App container">
      <input className="form-control mt-2" placeholder="Nome do Produto" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)}></input>
      <input className="form-control mt-2" placeholder="Descrição do Produto" value={descricaoProduto} onChange={(e) => setDescricaoProduto(e.target.value)}></input>
      <button className="mt-2 btn btn-primary" onClick={() => adicionarProduto(nomeProduto, descricaoProduto)}>Adicionar</button>

      <div className="mt-4">
        {produtos.map((produto, index) => <Produto key={index} produto={produto} onDelete={(id) => excluirProduto(id)}></Produto>)}
      </div>
    </div>
  );
};