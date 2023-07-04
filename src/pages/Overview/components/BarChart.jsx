import { Chart } from "chart.js/auto";
import { useEffect } from "react";

function BarChart({ downloads }) {
  useEffect(() => {
    const today = new Date();
    const week = [];

    for (let i = 1; i < 7; i++) {
      const priorDay = new Date(new Date().setDate(today.getDate() - i));
      week.push(priorDay);
    }

    const data = [
      { day: week[5].toUTCString().slice(5, 11), downloads: 70 },
      { day: week[4].toUTCString().slice(5, 11), downloads: 40 },
      { day: week[3].toUTCString().slice(5, 11), downloads: 80 },
      { day: week[2].toUTCString().slice(5, 11), downloads: 10 },
      { day: week[1].toUTCString().slice(5, 11), downloads: 20 },
      { day: week[0].toUTCString().slice(5, 11), downloads: 20 },
      { day: today.toUTCString().slice(5, 11), downloads: 50 },
    ];

    const context = document.getElementById("bar-chart");

    new Chart(context, {
      type: "bar",
      options: { maintainAspectRatio: false },
      data: {
        labels: data.map((row) => row.day),
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
            label: "Antal nedladdningar senaste veckan",
            data: data.map((row) => row.downloads),
          },
        ],
      },
    });
  }, []);

  return (
    <div className="w-full">
      <canvas id="bar-chart"></canvas>
    </div>
  );
}

export default BarChart;
