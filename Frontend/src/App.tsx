import Pessoas from "./pages/Pessoas";
import Transacoes from "./pages/Transacoes";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import "./App.css";


function App() {

  return (

    <div className="app">


      <header className="header">

        <h1>
          💰 Controle de Gastos
        </h1>

        <p>
          Gerenciamento financeiro pessoal
        </p>

      </header>



      <main className="conteudo">


        <Pessoas />


        <hr />


        <Transacoes />


        <hr />


        <Dashboard />


      </main>



      <Footer />


    </div>

  );

}


export default App;