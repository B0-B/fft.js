var ctx = document.getElementById('data-chart');

const data_chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1,2,3,4,5,6],
        datasets: [{
            label: 'data',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        elements: {
            point:{
                radius: 0
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

ctx = document.getElementById('freq-chart');

const freq_chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1,2,3,4,5,6],
        datasets: [{
            label: 'frequency',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        elements: {
            point:{
                radius: 0
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});