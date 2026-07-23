import { useEffect, useState } from "react";
import api from "../services/api";
import type { Pessoa, Transacao } from "../types";
import "./Transacoes.css";


function Transacoes() {

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState("Despesa");
  const [pessoaId, setPessoaId] = useState(0);


  async function carregarDados() {

    try {

      const pessoasResposta = await api.get("/pessoas");
      setPessoas(pessoasResposta.data);


      const transacoesResposta = await api.get("/transacoes");
      setTransacoes(transacoesResposta.data);


    } catch (erro) {

      console.log("Erro ao carregar dados:", erro);

    }

  }



  async function cadastrarTransacao() {

    try {

      await api.post("/transacoes", {
        descricao,
        valor,
        tipo,
        pessoaId
      });


      setDescricao("");
      setValor(0);
      setTipo("Despesa");
      setPessoaId(0);


      carregarDados();


    } catch (erro: any) {

      alert(
        erro.response?.data ||
        "Erro ao cadastrar transação"
      );

    }

  }



  async function excluirTransacao(id: number) {

    try {

      await api.delete(`/transacoes/${id}`);

      carregarDados();


    } catch (erro) {

      console.log("Erro ao excluir:", erro);

    }

  }



  useEffect(() => {

    carregarDados();

  }, []);



  return (

    <div className="container">


      <h1 className="titulo">
        Cadastro de Transações
      </h1>



      <div className="formulario">


        <input
          className="campo"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />



        <input
          className="campo"
          type="number"
          placeholder="Valor"
          value={valor === 0 ? "" : valor}
          onChange={(e) => setValor(Number(e.target.value))}
        />



        <select
          className="campo"
          value={pessoaId}
          onChange={(e) => setPessoaId(Number(e.target.value))}
        >

          <option value={0}>
            Selecione a pessoa
          </option>


          {pessoas.map((pessoa) => (

            <option
              key={pessoa.id}
              value={pessoa.id}
            >
              {pessoa.nome}
            </option>

          ))}


        </select>




        <select
          className="campo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >

          <option value="Despesa">
            Despesa
          </option>


          <option value="Receita">
            Receita
          </option>


        </select>



        <button
          className="botao"
          onClick={cadastrarTransacao}
        >
          Cadastrar
        </button>



      </div>



      <hr />



      <h2>
        Transações cadastradas
      </h2>



      <div className="lista">


        {transacoes.map((transacao) => (


          <div
            className="item"
            key={transacao.id}
          >


            <p>
              {transacao.descricao}
              {" - "}
              R$ {transacao.valor}
              {" - "}
              {transacao.tipo}
            </p>



            <button
              className="botao"
              onClick={() => excluirTransacao(transacao.id)}
            >
              Excluir
            </button>


          </div>


        ))}


      </div>



    </div>

  );

}


export default Transacoes;