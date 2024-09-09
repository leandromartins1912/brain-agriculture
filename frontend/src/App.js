import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ProducerForm from "./components/ProducerForm";
import ProducerList from "./components/ProducerList";
import Dashboard from "./components/Dashboard";

function App() {
  const [selectedProducer, setSelectedProducer] = useState(null);

  const handleClearSelection = () => {
    setSelectedProducer(null); // Limpa a seleção quando o botão "Limpar" é clicado
  };

  return (
    <Provider store={store}>
      <div className="w-screen min-h-screen bg-slate-500 flex flex-col justify-start p-6">
        <div className="w-full max-w-4xl space-y-4 mx-auto">
          <h1 className="text-3xl text-slate-100 font-bold mb-4 text-center">
            Cadastro de Produtor Rural
          </h1>

          <div className="mb-8">
            <h2 className="text-2xl text-slate-100 font-semibold mb-4 text-center">
              Cadastrar Novo Produtor
            </h2>
            <ProducerForm
              selectedProducer={selectedProducer}
              onClear={handleClearSelection}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl text-slate-100 font-semibold mb-4 text-center">
              Lista de Produtores
            </h2>
            <ProducerList
              onEdit={setSelectedProducer}
              selectedProducerId={selectedProducer?.id || null}
              clearSelection={selectedProducer === null}
            />
          </div>

          <div className="mb-8 ">
            <div className="bg-slate-500 p-4 rounded-lg">
              <h2 className="text-2xl text-slate-100 font-semibold mb-4 text-center">
                Dashboard
              </h2>
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
