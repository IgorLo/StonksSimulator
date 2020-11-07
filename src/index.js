import './index.css'
import './snackbar.css'
import "./utils"
import Chart from 'chart.js'
import {Line} from 'vue-chartjs'
import Vue from 'vue'
import Server from "./Server";


let CHART_WIDTH = 50;

let app = new Vue({
    el: '#main',
    data: {
        users: [
            {
                name: 'igorlo',
                money: 100,
                papers: 15
            },
            {
                name: 'alex',
                money: 2000,
                papers: 8
            }
        ]
    }
})

let server = new Server('ws://192.168.1.10:8080/test');

function addUser() {
    app.users.push(
        {
            name: makeid(5),
            money: Math.random()
        }
    )
}

let chartCanvas = document.getElementById("chart");

let lineChart = new Chart(chartCanvas, {
    options: {
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 50,    // minimum will be 0, unless there is a lower value.
                    suggestedMax: 120
                }
            }]
        }
    },
    data: {
        labels: Array.from(Array(CHART_WIDTH).keys()),
        datasets: [{
            label: "GDCN inc. money",
            data: [],
            borderColor: 'rgb(255,71,71)',
            fill: false
        }]
    },
    type: 'line'
});

let current = 100;

function changeChart() {
    lineChart.data.datasets[0].data.push(current - 10 + Math.random() * 20)
    if (lineChart.data.datasets[0].data.length > CHART_WIDTH * 0.85) {
        lineChart.data.datasets[0].data = lineChart.data.datasets[0].data.slice(1)
    }
    lineChart.update();
}

setInterval(changeChart, 500);

// changeChart()
