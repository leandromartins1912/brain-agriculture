import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducers, deleteProducer } from "../redux/producerSlice";
import Swal from "sweetalert2";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const ProducerList = ({ onEdit, selectedProducerId, clearSelection }) => {
  const dispatch = useDispatch();
  const { producers, status } = useSelector((state) => state.producers);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducers());
  }, [dispatch]);

  useEffect(() => {
    if (clearSelection) {
      setSelectedId(null);
    }
  }, [clearSelection]);

  if (status === "loading") return <div>Carregando...</div>;

  const handleEdit = (producer) => {
    setSelectedId(producer.id);
    onEdit(producer);
  };

  return (
    <div className="table w-full rounded-lg shadow-md overflow-hidden">
      <div className="table-header-group bg-slate-800 text-white p-6 rounded-t-lg">
        <div className="table-row">
          <div className="table-cell text-left p-2">Nome</div>
          <div className="table-cell text-left p-2">Fazenda</div>
          <div className="table-cell text-left p-2">Cidade</div>
          <div className="table-cell text-left p-2">Ações</div>
        </div>
      </div>
      <div className="table-row-group">
        {producers.map((producer) => (
          <div
            className={`table-row ${
              selectedId === producer.id ? "bg-red-100" : "bg-white"
            }`}
            key={producer.id}
          >
            <div className="table-cell p-2">{producer.name}</div>
            <div className="table-cell p-2">{producer.farmName}</div>
            <div className="table-cell p-2">{producer.city}</div>
            <div className="table-cell p-2 space-x-2">
              <button
                onClick={() => handleEdit(producer)} // Chama a função handleEdit
                className="text-yellow-400 hover:text-yellow-700"
              >
                <PencilIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Tem certeza?",
                    text: "Você realmente deseja excluir este produtor? Esta ação não pode ser desfeita.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Sim",
                    cancelButtonText: "Não",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteProducer(producer.id));
                      Swal.fire(
                        "Excluído!",
                        "O produtor foi excluído.",
                        "success"
                      );
                    }
                  });
                }}
                className="text-red-400 hover:text-red-700"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProducerList;
