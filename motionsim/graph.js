let chart, chart2;

function graph() {
    var ctx = document.getElementById('chart').getContext('2d');
    var ctx2 = document.getElementById('chart2').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Now', '-1s', '-2s', '-3s', '-4s', '-5s'],
            datasets: [{
                label: 'Velocity over time',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        min: -200,
                        max: 200,
                        stepSize: 20
                    }
                }]
            },
            animation: {
                duration: 0,
            },
        }
    });
    chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Now', '-1s', '-2s', '-3s', '-4s', '-5s'],
            datasets: [{
                label: 'Position over time',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(132, 99, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(132, 99, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 600,
                        stepSize: 20
                    }
                }]
            },
            animation: {
                duration: 0,
            },
        }
    });
}

function updateData(newPoint, newPoint2) {
    chart.data.datasets[0].data.push(newPoint);
    chart.data.datasets[0].data.shift();

    chart2.data.datasets[0].data.push(newPoint2);
    chart2.data.datasets[0].data.shift();

    chart.update();
    chart2.update();
}