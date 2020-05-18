import Chart from 'chart.js';

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
};

window.randomScalingFactor = function () {
    return Math.round(Math.random() * 20 - 10);
};

let timestamp = 8;

let config = {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [{
            label: 'leftEye',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            fill: false,
        }, {
            label: 'rightEye',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
        }],
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Distance check',
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true,
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time',
                },
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Distance',
                },
            }],
        },
    },
};

window.onload = function () {
    let ctx = document.getElementById('myChart').getContext('2d');
    window.myLine = new Chart(ctx, config);
};

let addData = function (keypoint) {
    let temp = {};
    keypoint.forEach(function (e) {
        temp[e['part']] = e['position'];
    })

    if (config.data.datasets.length > 0) {
        config.data.labels.push(timestamp++);

        let nosePosition = temp['nose'];

        config.data.datasets.forEach(function (dataset) {
            let dataPosition = temp[dataset.label];

            let dx = dataPosition['x'] - nosePosition['x'];
            let dy = dataPosition['y'] - nosePosition['y'];

            let distance = Math.sqrt(dx * dx + dy * dy)

            dataset.data.push(distance);
        });

        window.myLine.update();
    }
};

let removeData = function () {
    config.data.labels.splice(0, 1); // remove the label first

    config.data.datasets.forEach(function (dataset) {
        dataset.data.splice(0, 1);
    });

    window.myLine.update();
};

let addBtn = document.getElementById('add');
addBtn.onclick = addData;

let removeBtn = document.getElementById('remove');
removeBtn.onclick = removeData;

let a = [
    {
        'score': 0.5,
        'part': 'nose',
        'position': {
            'x': 278,
            'y': 342
        }
    },
    {
        'score': 0.96,
        'part': 'leftEye',
        'position': {
            'x': 255,
            'y': 290
        }
    },
    {
        'score': 0.96,
        'part': 'rightEye',
        'position': {
            'x': 325,
            'y': 309
        }
    },
]

addData(a)