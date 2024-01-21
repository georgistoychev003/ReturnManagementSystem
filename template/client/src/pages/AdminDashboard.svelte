<script>
    import { onMount, afterUpdate, onDestroy } from "svelte";
    import { Chart, registerables, LineController, CategoryScale, LinearScale, PieController, Legend, Title } from 'chart.js';
    Chart.register(LineController, CategoryScale, LinearScale, PieController, Legend, Title);

    let numberOfRMA = 0;
    let numberOfUsers = 0;
    let selectedInterval = 'year'; // Default interval
    let chart;
    let pieChart;
    let chartTitle = `Number of requests per: ${selectedInterval}`;
    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];



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
            } else {
                console.error('Failed to fetch RMA data');
            }
        } catch (error) {
            console.error('Error fetching RMA data:', error);
        }
    }
    async function fetchMonthlyRMA() {
        try {
            const response = await fetch('http://localhost:3000/rma/monthly');
            if (response.ok) {
                const data = await response.json();
                processRMAData(data);
                updateChart(data);

            } else {
                console.error('Failed to fetch monthly RMA data');
            }
        } catch (error) {
            console.error('Error fetching monthly RMA data:', error);
        }
    }

    onMount(fetchMonthlyRMA);

    function processRMAData(rmaData) {
        // Extract all unique months from the RMA data
        const uniqueMonths = [...new Set(rmaData.map(rma => new Date(rma.returnedDate).getMonth() + 1))];

        // Create an array containing all months or weeks depending on the selected interval
        const allIntervals = selectedInterval === 'week' ? Array.from({ length: 52 }, (_, i) => i + 1) :
            selectedInterval === 'month' ? uniqueMonths :
                Array.from({ length: 12 }, (_, i) => i + 1);

        let processedData = rmaData.reduce((acc, rma) => {
            // Extract the week, month, or year from the date based on selected interval
            const intervalValue = selectedInterval === 'week' ? new Date(rma.returnedDate).getWeekNumber() :
                selectedInterval === 'month' ? new Date(rma.returnedDate).getMonth() + 1 :
                    new Date(rma.returnedDate).getFullYear();

            acc[intervalValue] = (acc[intervalValue] || 0) + 1;
            return acc;
        }, {});

        // Convert the object into an array suitable for the chart
        let chartData = allIntervals.map(interval => {
            const count = processedData[interval] || 0;
            const label = selectedInterval === 'week' ? `Week ${interval}` :
                selectedInterval === 'month' ? `Month ${interval}` :
                    selectedInterval === 'year' ? monthNames[interval - 1] :
                        `Year ${interval}`;

            return { label, count };
        });

        updateChart(chartData);
    }




    function updateChart(chartData) {
        // Assuming chartData is an array of objects with monthYear and RMACount properties
        chart.data.labels = chartData.map(item => item.monthYear);
        chart.data.datasets[0].data = chartData.map(item => item.RMACount);

        const maxDataValue = Math.max(...chartData.map(item => item.RMACount) );
        console.log(maxDataValue)


        chart.options.scales.y = {
            type: 'linear',
            position: 'left',
            title: {
                display: true,
                text: 'Number of RMA',
                color : 'white',
            },
            grid: {
                color: 'black' // Set the color of the x-axis grid lines (keep them black)
            },
            ticks: {
                color: 'white',
                precision: 0, // Round tick values to integers
               max: maxDataValue + 2, // Set suggested max value
                min: 0,
                beginAtZero: true
            }
        };


        // Update x-axis configuration for 'year' interval
        if (selectedInterval === 'year') {
            chart.options.scales.x.type = 'category';
            chart.options.scales.x.labels = monthNames;

            chart.options.scales.x.ticks = {
                color: 'white',
                min: monthNames[0],
                max: monthNames[11]
            };


        } else {
            chart.options.scales.x.type = 'linear';
        }



        chart.options.plugins.title.text = `Number of requests per: ${selectedInterval}`;
        chart.update();
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
                    borderColor: 'white',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: chartTitle,
                        color: 'white',

                    }
                },
                scales: {
                    x: {
                        type: selectedInterval === 'year' ? 'category' : 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Time'
                        },
                        grid: {
                            color: 'black'
                        },
                        ticks: {
                            color: 'white'
                        },
                        labels: selectedInterval === 'year' ?
                            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] :
                            undefined // Set labels for months if interval is 'year'
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Number of RMA'
                        },
                        grid: {
                            color: 'black' // Set the color of the x-axis grid lines (keep them black)
                        },
                        ticks: {
                            color: 'white', // Set the color of the x-axis grid lines
                            min : 0,
                            beginAtZero: true,


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
                    backgroundColor: mostReturnedProducts.map(product => product.color),
                    text: mostReturnedProducts.map(product => product.name)
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true
                    },
                    title: {
                        display: true,
                        text: 'Most Returned Products',
                        color: 'white'
                    }
                }
            },
            plugins: [Legend, Title]
        });


    });



    afterUpdate(() => {
        fetchNumberOfRMA();
        fetchMonthlyRMA();

    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }

        if (pieChart) {
            pieChart.destroy();
        }
    });

    $: {
        // This reactive statement will trigger whenever selectedInterval changes
        console.log('Selected Interval Changed:', selectedInterval);
    }

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
            <div class="big-number">{numberOfUsers < 10 ? `0${numberOfUsers}` : numberOfRMA}</div>
        </div>
        <div class="red-box">
           <!-- <div>Most returned products</div> -->

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
        height: 45vw; /* Adjust as needed */
        background-color: red;
        margin-bottom: 2vw;
    }

    #rmaChart {
        width: calc(100% - 4vw); /* Adjust the chart width */
        height: 20vw; /* Adjust the chart height */

        margin-bottom: 2vw; /* Adjust margin-bottom as needed */
    }

    #pieChart {
        width: calc(50% - 2vw); /* Adjust the chart width */
        height: 15vw; /* Adjust the chart height */
        background-color: red;
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
