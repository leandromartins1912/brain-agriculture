import React from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar os elementos necessários
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { producers } = useSelector((state) => state.producers);
  const totalFarms = producers.length;
  const totalArea = producers.reduce(
    (sum, producer) => sum + parseFloat(producer.totalArea || 0),
    0
  );

  // Dados por estado
  const statesData = producers.reduce((acc, producer) => {
    acc[producer.state] = (acc[producer.state] || 0) + 1;
    return acc;
  }, {});
  const stateLabels = Object.keys(statesData);
  const stateValues = Object.values(statesData);

  const stateChartData = {
    labels: stateLabels,
    datasets: [
      {
        label: "Fazendas por Estado",
        data: stateValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Dados por cultura
  const cropsData = producers.reduce((acc, producer) => {
    if (producer.crops && Array.isArray(producer.crops)) {
      producer.crops.forEach((crop) => {
        acc[crop] = (acc[crop] || 0) + 1;
      });
    }
    return acc;
  }, {});
  const cropLabels = Object.keys(cropsData);
  const cropValues = Object.values(cropsData);

  const cropChartData = {
    labels: cropLabels,
    datasets: [
      {
        label: "Fazendas por Cultura",
        data: cropValues,
        backgroundColor: [
          "#FF9F40",
          "#FFCD56",
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
        ],
        hoverBackgroundColor: ["#FF9F40", "#FFCD56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  // Dados de uso do solo
  const landUseData = producers.reduce(
    (acc, producer) => {
      acc.agricultural += parseFloat(producer.agriculturalArea || 0);
      acc.vegetation += parseFloat(producer.vegetationArea || 0);
      return acc;
    },
    { agricultural: 0, vegetation: 0 }
  );

  const landUseChartData = {
    labels: ["Área Agricultável", "Vegetação"],
    datasets: [
      {
        label: "Uso do Solo",
        data: [landUseData.agricultural, landUseData.vegetation],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="bg-gray-100 p-6 rounded shadow-md">
      <div className="flex space-x-4 mb-4">
        <p className="text-lg font-medium">Total de fazendas: {totalFarms}</p>
        <p className="text-lg font-medium">Total de hectares: {totalArea} ha</p>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="w-full md:w-1/3">
          <h3 className="text-center font-bold mb-4">Fazendas por Estado</h3>
          <Pie data={stateChartData} />
        </div>

        <div className="w-full md:w-1/3">
          <h3 className="text-center font-bold mb-4">Fazendas por Cultura</h3>
          <Pie data={cropChartData} />
        </div>

        <div className="w-full md:w-1/3">
          <h3 className="text-center font-bold mb-4">Uso do Solo</h3>
          <Pie data={landUseChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
