import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createProducer, updateProducers } from "../redux/producerSlice";

const ProducerForm = ({ selectedProducer, onClear }) => {
  const [form, setForm] = useState({
    document: "",
    name: "",
    farmName: "",
    city: "",
    state: "",
    totalArea: "",
    agriculturalArea: "",
    vegetationArea: "",
    crops: [],
  });

  const [formValid, setFormValid] = useState(false);
  const dispatch = useDispatch();
  const { error, succeeded, status } = useSelector((state) => state.producers);

  useEffect(() => {
    if (selectedProducer) {
      setForm(selectedProducer);
    } else {
      resetForm();
    }
  }, [selectedProducer]);

  const validateForm = useCallback(() => {
    const isValid =
      form.document &&
      form.name &&
      form.farmName &&
      form.city &&
      form.state &&
      form.totalArea &&
      form.agriculturalArea &&
      form.vegetationArea &&
      form.crops.length > 0;

    setFormValid(isValid);
  }, [form]);

  useEffect(() => {
    validateForm();
  }, [form, validateForm]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      if (status === "succeeded") {
        Swal.fire({
          title: "Sucesso!",
          text: succeeded,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }
  }, [status, error, succeeded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.document) {
      if (selectedProducer) {
        dispatch(updateProducers(form));
      } else {
        dispatch(createProducer(form));
      }

      resetForm();
      onClear();
    }
  };

  const resetForm = () => {
    setForm({
      document: "",
      name: "",
      farmName: "",
      city: "",
      state: "",
      totalArea: "",
      agriculturalArea: "",
      vegetationArea: "",
      crops: [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4"
    >
      <input
        type="number"
        className="w-full border p-2"
        placeholder="CPF ou CNPJ"
        value={form.document}
        onChange={(e) => setForm({ ...form, document: e.target.value })}
      />
      <input
        type="text"
        className="w-full border p-2"
        placeholder="Nome do Produtor"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        className="w-full border p-2"
        placeholder="Nome da Fazenda"
        value={form.farmName}
        onChange={(e) => setForm({ ...form, farmName: e.target.value })}
      />
      <input
        type="text"
        className="w-full border p-2"
        placeholder="Cidade"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />
      <input
        type="text"
        className="w-full border p-2"
        placeholder="Estado"
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
      />
      <input
        type="number"
        className="w-full border p-2"
        placeholder="Área Total"
        value={form.totalArea}
        onChange={(e) => setForm({ ...form, totalArea: e.target.value })}
      />
      <input
        type="number"
        className="w-full border p-2"
        placeholder="Área agricultável"
        value={form.agriculturalArea}
        onChange={(e) => setForm({ ...form, agriculturalArea: e.target.value })}
      />
      <input
        type="number"
        className="w-full border p-2"
        placeholder="Área de vegetação"
        value={form.vegetationArea}
        onChange={(e) => setForm({ ...form, vegetationArea: e.target.value })}
      />
      <input
        type="text"
        className="w-full border p-2"
        placeholder="Culturas plantadas (Soja, Milho)"
        value={form.crops}
        onChange={(e) => setForm({ ...form, crops: e.target.value })}
      />
      <div className="flex space-x-4">
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            formValid ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!formValid || status === "loading"}
        >
          {selectedProducer ? "Salvar" : "Cadastrar"}
        </button>
        <button
          type="button"
          onClick={() => {
            resetForm();
            onClear();
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Limpar
        </button>
      </div>
    </form>
  );
};

export default ProducerForm;
