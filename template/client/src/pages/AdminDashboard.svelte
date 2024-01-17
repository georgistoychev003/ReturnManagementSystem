<script>
    import { onMount, afterUpdate, onDestroy } from "svelte";
    import { Chart, registerables, LineController, CategoryScale, LinearScale, PieController, Legend, Title } from 'chart.js';
    Chart.register(LineController, CategoryScale, LinearScale, PieController, Legend, Title);

    let numberOfRMA = 0;
    let numberOfUsers = 0;
    let selectedInterval = 'week'; // Default interval
    let chart;
    let pieChart;


    let mostReturnedProducts = [
        { name: 'Product1', count: 20, color: 'rgba(255, 99, 132, 0.7)' },
        { name: 'Product2', count: 7, color: 'rgba(54, 162, 235, 0.7)' },
        { name: 'Product3', count: 4, color: 'rgba(255, 206, 86, 0.7)' }
    ];

    async function fetchNumberOfUsers() {
        try {
            const response = await fetch('http://localhost:3000/users/count');
            if (response.ok) {
                const data = await response.json();
                numberOfUsers = data['count(email)'] || 0;
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    onMount(fetchNumberOfUsers);

    async function fetchNumberOfRMA() {
        try {
            const response = await fetch(`http://localhost:3000/rma/count`);
            if (response.ok) {
                const data = await response.json();
                numberOfRMA = data['count(RMAId)'] || 0;
                updateChart(data);
            } else {
                console.error('Failed to fetch RMA data');
            }
        } catch (error) {
            console.error('Error fetching RMA data:', error);
        }
    }



    function processRMAData(rmaData) {
        let processedData = rmaData.reduce((acc, rma) => {
            // Simplified example: Extract the week number from the date
            const week = new Date(rma.returnedDate).getWeekNumber();
            acc[week] = (acc[week] || 0) + 1;
            return acc;
        }, {});

        // Convert the object into an array suitable for the chart
        let chartData = Object.entries(processedData).map(([week, count]) => {
            return { label: `Week ${week}`, count };
        });

        updateChart(chartData);
    }

    function updateChart(chartData) {
        if (chart) {
            chart.data.labels = chartData.map(item => item.label);
            chart.data.datasets[0].data = chartData.map(item => item.count);
            chart.update();
        }
    }

    function updatePieChart() {
        if (pieChart) {
            pieChart.data.labels = mostReturnedProducts.map(product => '');
            pieChart.data.datasets[0].data = mostReturnedProducts.map(product => product.count);
            pieChart.data.datasets[0].backgroundColor = mostReturnedProducts.map(product => product.color);
            pieChart.update();
        }
    }

    onMount(() => {
        Chart.register(...registerables);
        const ctx = document.getElementById('rmaChart');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Number of RMA',
                    data: [],
                    borderColor: 'red',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `Number of requests per: ${selectedInterval}`
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Number of RMA'
                        }
                    }
                }
            },
            plugins: registerables
        });


        const pieCtx = document.getElementById('pieChart');
        pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: mostReturnedProducts.map(product => ''),
                datasets: [{
                    data: mostReturnedProducts.map(product => product.count),
                    backgroundColor: mostReturnedProducts.map(product => product.color)
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Most Returned Products'
                    }
                }
            },
            plugins: [Legend, Title]
        });


    });



    afterUpdate(() => {
        fetchNumberOfRMA();
    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }

        if (pieChart) {
            pieChart.destroy();
        }
    });

    function updateInterval(interval) {
        selectedInterval = interval;
    }
</script>

<div class="container">
    <div class="greeting">Hello Admin!</div>
    <div class="line"></div>

    <div class="red-boxes">
        <div class="red-box">
            <div>Number of users</div>
            <div class="big-number">{numberOfUsers}</div>
        </div>
        <div class="red-box">
            <div>Most returned products</div>
            <img src="https://i.ibb.co/GRHPDCV/chart2.png" alt="pieChart">
            <canvas id="pieChart" ></canvas>
        </div>
        <div class="red-box">
            <div>Number of RMA</div>
            <div class="big-number">{numberOfRMA < 10 ? `0${numberOfRMA}` : numberOfRMA}</div>
        </div>
    </div>

    <div class="big-red-rectangle">
        <canvas id="rmaChart"></canvas>
        <div class="controls">
            <button on:click={() => updateInterval('week')}>Per Week</button>
            <button on:click={() => updateInterval('month')}>Per Month</button>
            <button on:click={() => updateInterval('year')}>Per Year</button>
        </div>
    </div>
</div>

<style>
    .container {
        max-width: 90%;
        margin: 0 auto;
        padding: 2%;
        position: relative; /* Added for positioning child elements */
    }

    .greeting {
        font-size: 2vw; /* Adjust as needed */
        margin-bottom: 2vw;
    }

    .line {
        width: 80%;
        margin: 0 auto;
        border-top: 0.2vw solid lightblue; /* Adjust as needed */
        margin-bottom: 2vw;
    }

    .red-boxes {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2vw;
        max-height: 50vh;
    }

    .red-box {
        flex: 1;
        text-align: center;
        background-color: red;
        padding: 2vw;
        color: white;
        margin: 0 2vw; /* Space between red boxes */
    }

    .big-number {
        font-size: 3vw; /* Adjust as needed */
        margin-bottom: 1vw;
    }

    .big-red-rectangle {
        position: relative; /* Set relative positioning */
        height: 25vw; /* Adjust as needed */
        background-color: red;
        margin-bottom: 2vw;
    }

    #rmaChart {
        width: calc(100% - 4vw); /* Adjust the chart width */
        height: 20vw; /* Adjust the chart height */
       background-color: darkred; /* Set background color for the chart */
        margin-bottom: 2vw; /* Adjust margin-bottom as needed */
    }

    #pieChart {
        width: calc(50% - 2vw); /* Adjust the chart width */
        width :0;
        height: 0vw; /* Adjust the chart height */
        background-color: darkred; /* Set background color for the chart */
        margin-bottom: 2vw; /* Adjust margin-bottom as needed */
    }
     img {
        max-width: 100%;
        height: auto;
    }

    .controls {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        gap: 10px;
        z-index: 1; /* Ensure buttons are above the chart */
    }
</style>
