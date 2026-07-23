import { useEffect, useState } from "react";
import api from "../services/api";
import type { Pessoa } from "../types";
import "./Pessoas.css";


function Pessoas() {

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);



  async function carregarPessoas() {

    try {

      const resposta = await api.get("/pessoas");

      console.log(resposta.data);

      setPessoas(resposta.data);


    } catch (erro) {

      console.log("Erro ao carregar pessoas:", erro);

    }

  }



  async function cadastrarPessoa() {

    try {

      await api.post("/pessoas", {
        nome,
        idade
      });


      setNome("");
      setIdade(0);


      carregarPessoas();


    } catch (erro) {

      console.log("Erro ao cadastrar pessoa:", erro);

    }

  }



  async function excluirPessoa(id: number) {

    try {

      await api.delete(`/pessoas/${id}`);

      carregarPessoas();


    } catch (erro) {

      console.log("Erro ao excluir pessoa:", erro);

    }

  }



  useEffect(() => {

    carregarPessoas();

  }, []);



  return (

    <div className="container">


      <h1 className="titulo">
        Cadastro de Pessoas
      </h1>



      <div className="formulario">


        <input
          className="campo"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />



        <input
          className="campo"
          type="number"
          placeholder="Idade"
          value={idade === 0 ? "" : idade}
          onChange={(e) => setIdade(Number(e.target.value))}
        />



        <button
          className="botao"
          onClick={cadastrarPessoa}
        >
          Cadastrar
        </button>


      </div>



      <hr />



      <h2>
        Pessoas cadastradas
      </h2>



      <div className="lista">


        {pessoas.map((pessoa) => (


          <div
            className="item"
            key={pessoa.id}
          >


            <p>
              {pessoa.nome} - {pessoa.idade} anos
            </p>



            <button
              className="botao"
              onClick={() => excluirPessoa(pessoa.id)}
            >
              Excluir
            </button>


          </div>


        ))}


      </div>



    </div>

  );

}


export default Pessoas;