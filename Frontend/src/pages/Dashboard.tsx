import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";


interface Total {
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}



function Dashboard() {


  const [totais, setTotais] = useState<Total[]>([]);



  async function carregarTotais() {

    try {

      const resposta = await api.get("/totais");

      setTotais(resposta.data);


    } catch (erro) {

      console.log("Erro ao buscar totais:", erro);

    }

  }



  useEffect(() => {

    carregarTotais();

  }, []);



  return (

    <div className="container">


      <h1 className="titulo">
        Dashboard Financeiro
      </h1>



      {totais.map((item, index) => (


        <div
          className="card"
          key={index}
        >


          <h2>
            {item.nome}
          </h2>


          <p>
            Receitas: R$ {item.totalReceitas}
          </p>


          <p>
            Despesas: R$ {item.totalDespesas}
          </p>


          <p className="total">
            Saldo: R$ {item.saldo}
          </p>


        </div>


      ))}



    </div>

  );

}


export default Dashboard;