import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

// Register the chart components we will use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const StudyProgressGraph = ({ studyData }) => {
  // Assuming studyData is an array of objects fetched from your database
  // and passed as a prop to this component, where each object has 
  // the structure of your studyProgressSchema

  const data = {
    labels: studyData.map(data => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        type: 'bar',
        label: 'Words Studied',
        data: studyData.map(data => data.wordsStudied),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        type: 'line',
        label: 'Hours Spent',
        data: studyData.map(data => data.hoursSpent),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <h2>Study Progress Overview</h2>
      <Bar data={data} options={options} />
    </>
  );
};

export default StudyProgressGraph;
