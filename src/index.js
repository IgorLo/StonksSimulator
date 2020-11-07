import './styles/index.css'
import './styles/snackbar.css'
import "./utils"
import './styles/common-button.css'
import './styles/buy_sell_buttons.css'
import Chart from 'chart.js'
import {Line} from 'vue-chartjs'
import Vue from 'vue'
import Server from "./Server";
import {makeid} from "./utils";


let CHART_WIDTH = 60;

let app = new Vue({
    el: '#main',
    data: {
        cost: 0,
        userName: makeid(6),
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

let server = new Server('ws://192.168.1.10:8080/test', app.userName, updateUsers, addCost);

let chartCanvas = document.getElementById("chart");

let lineChart = new Chart(chartCanvas, {
    options: {
        maintainAspectRatio: false,
        animation: {
            duration: 1000
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    // suggestedMin: 50,    // minimum will be 0, unless there is a lower value.
                    // max: 120
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

function addCost(cost) {
    app.cost = cost;
    lineChart.data.datasets[0].data.push(cost)
    // let max;
    // let min;
    // lineChart.options.scales.yAxes.ticks.min = 5
    // lineChart.options.scales.yAxes.ticks.max = 15
    if (lineChart.data.datasets[0].data.length > CHART_WIDTH * 0.9) {
        lineChart.data.datasets[0].data = lineChart.data.datasets[0].data.slice(Math.floor(CHART_WIDTH * 0.7))
    }
    lineChart.update();
}

function updateUsers(users) {
    if (users.name === undefined) {
        users.sort((a, b) => {
            if (a.name === app.userName){
                return 1
            } else {
                return a.money >= b.money
            }
        });
        app.users = users
    } else {
        //    TODO single user info
        server.sendAction("-1");
        server.sendAction("+1");
    }
}

let sellButton = document.getElementById('sell-button')
sellButton.onclick = function () {
    server.sendAction("-1");
}
let buyButton = document.getElementById('buy-button')
buyButton.onclick = function () {
    server.sendAction("+1");
}

