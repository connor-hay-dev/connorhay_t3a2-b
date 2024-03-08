// // import React from 'react';
// // import { Bar, Line } from 'react-chartjs-2';
// // import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

// // // Register the chart components we will use
// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   LineElement,
// //   PointElement,
// //   Tooltip,
// //   Legend
// // );

// // const StudyProgressGraph = ({ studyData }) => {
// //   // Assuming studyData is an array of objects fetched from your database
// //   // and passed as a prop to this component, where each object has 
// //   // the structure of your studyProgressSchema

// //   const data = {
// //     labels: studyData.map(data => new Date(data.date).toLocaleDateString()),
// //     datasets: [
// //       {
// //         type: 'bar',
// //         label: 'Words Studied',
// //         data: studyData.map(data => data.wordsStudied),
// //         borderColor: 'rgb(255, 99, 132)',
// //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
// //       },
// //       {
// //         type: 'line',
// //         label: 'Hours Spent',
// //         data: studyData.map(data => data.hoursSpent),
// //         borderColor: 'rgb(54, 162, 235)',
// //         backgroundColor: 'rgba(54, 162, 235, 0.5)',
// //       }
// //     ],
// //   };

// //   const options = {
// //     scales: {
// //       y: {
// //         beginAtZero: true,
// //       },
// //     },
// //   };

// //   return (
// //     <>
// //       <h2>Study Progress Overview</h2>
// //       <Bar data={data} options={options} />
// //     </>
// //   );
// // };

// // export default StudyProgressGraph;

// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';

// const ProgressGraph = () => {
//   const [chartData, setChartData] = useState({});

//   const fetchCumulativeWords = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:4000/progress/cumulative-words-studied');
//       prepareChartData(data.data);
//     } catch (error) {
//       console.error('Error fetching cumulative words data:', error);
//     }
//   };

//   const prepareChartData = (data) => {
//     // Assuming data is sorted by date in ascending order
//     const labels = [];
//     const cumulativeWordsData = [];

//     const today = new Date();
//     const past5Days = new Date(today);
//     past5Days.setDate(past5Days.getDate() - 4); // Adjust to include the last 5 days

//     data.forEach(item => {
//       const itemDate = new Date(item.date);
//       if (itemDate >= past5Days) {
//         labels.push(itemDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
//         cumulativeWordsData.push(item.cumulativeWordsStudied);
//       }
//     });

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: 'Cumulative Words Studied',
//           data: cumulativeWordsData,
//           fill: false,
//           backgroundColor: 'rgb(75, 192, 192)',
//           borderColor: 'rgba(75, 192, 192, 0.2)',
//         },
//       ],
//     });
//   };

//   useEffect(() => {
//     fetchCumulativeWords();
//   }, []);

//   return (
//     <div>
//       <h2>Your Study Progress</h2>
//       <Line data={chartData} options={{
//         scales: {
//           x: {
//             type: 'time',
//             time: {
//               unit: 'day'
//             }
//           },
//           y: {
//             beginAtZero: true
//           }
//         }
//       }} />
//     </div>
//   );
// };

// export default ProgressGraph;
