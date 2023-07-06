import { Chart } from "chart.js/auto";
import { useEffect } from "react";
import axios from "axios";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function BarChart() {
  async function getDownloads() {
    try {
      const URL = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${URL}/statistics/downloads`);
      renderChart(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        // Create a request button and message
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    getDownloads();
  });

  function renderChart(data) {
    const statistics = [];
    const chartStatistics = [];

    for (let i = 0; i < data.length; i++) {
      const month = new Date(data[i].timestamp).getMonth();
      const day = new Date(data[i].timestamp).getDate();
      statistics.push({ id: i, month: months[month], day: day });
    }

    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(new Date().setDate(today.getDate() - i));
      const day = date.getDate();
      const month = date.getMonth();
      const remainingDownloads = statistics.filter(
        (date) => date.day === day && date.month === months[month]
      );
      chartStatistics.push({
        day: `${day} ${months[month]}`,
        downloads: remainingDownloads.length,
      });
    }

    const context = document.getElementById("bar-chart");

    new Chart(context, {
      type: "bar",
      data: {
        labels: chartStatistics.map((row) => row.day),
        datasets: [
          {
            backgroundColor: [
              "#8997F5",
              "#0827F5",
              "#451499",
              "#c8b2ff",
              "#d9dbda",
              "#5FF78A",
              "#02CC3B",
            ],
            label: "Nedladdnings försök av Kalejdoskop",
            data: chartStatistics.map((row) => row.downloads),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Antal nedladdnings försök de senaste 7 dagarna",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });
  }

  return (
    <div className="w-full">
      <canvas id="bar-chart"></canvas>
    </div>
  );
}

export default BarChart;
