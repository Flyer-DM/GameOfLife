document.addEventListener("DOMContentLoaded", async function () {
    var ctx = document.getElementById('plot').getContext('2d');
    var time = [0];
    var aliveData = [];
    var lastValueAlive;
    var deadData = [];
    var lastValueDead;
    var generation = 1;

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'Cells appeared',
                data: aliveData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false
            }, {
                label: 'Cells died',
                data: deadData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Generation'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Cells'
                    }
                }
            }
        }
    });

    function updatePlot() {
        var aliveCells = parseInt(document.getElementById('aliveCells').innerText.split(" ")[1]);
        var deadCells = parseInt(document.getElementById('deadCells').innerText.split(" ")[1]);
        if (generation == 1) {
            lastValueAlive = aliveCells;
            lastValueDead = deadCells;
        }
        else {
            aliveData.push(aliveCells - lastValueAlive);
            deadData.push(deadCells - lastValueDead);
            lastValueAlive = aliveCells;
            lastValueDead = deadCells;
            chart.update();
        }
        time.push(generation);
        generation += 1;
        if (time.length > 1000) {
            time.shift();
            aliveData.shift();
            deadData.shift();
        }
    }

    while (true) {
        updatePlot()
        if (document.getElementById('generationNum').innerHTML.includes("ended")) break;
        await delay(100);
    }
});