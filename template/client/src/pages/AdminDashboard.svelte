<script>
    import { onMount, afterUpdate, onDestroy } from "svelte";
    import { Chart, registerables, LineController, CategoryScale, LinearScale, PieController, Legend, Title } from 'chart.js';
    import allYears from "html2pdf.js";
    Chart.register(LineController, CategoryScale, LinearScale, PieController, Legend, Title);
    let numberOfRMA = 0;
    let numberOfUsers = 0;
    let selectedInterval = 'month'; // Default interval
    let chart;
    let pieChart;
    let chartTitle = `Number of requests per: ${selectedInterval}`;

    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday'];
    const years = ['2023', '2024', '2025', '2026', '2027' ];



    let mostReturnedProducts = [


    ];

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/product/mostReturned');
            const data = await response.json();

            // Assign a new color for each fetched product
            const newColor = generateRandomColor();
            // Create a new array with the fetched products
            const updatedProducts = data.map(product => ({
                name: product.productName,
                count: product.totalTimesReturned,
                color: generateRandomColor()
            }));

            // Update the mostReturnedProducts array
            mostReturnedProducts = [...mostReturnedProducts, ...updatedProducts];
            updatePieChart();
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        console.log(mostReturnedProducts);
    });

    function generateRandomColor() {
        // Generate a random color using RGB values
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
        return color;
    }

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
        const currentYear = new Date().getFullYear();
        const yearsToShow = 3;

        // Extract all unique years and months from the RMA data
        const uniqueYears = [...new Set(rmaData.map(rma => new Date(rma.monthYear).getFullYear()))];
        const uniqueMonths = [...new Set(rmaData.map(rma => new Date(rma.monthYear).getMonth() + 1))];

        console.log('these are :' + uniqueMonths);
        console.log('these are unique years : ' + uniqueYears);

        // Create an array containing all years to be displayed
        const allYears = Array.from(
            { length: yearsToShow * 2 + 1 },
            (_, i) => currentYear - yearsToShow + i
        );

        let processedData = rmaData.reduce((acc, rma) => {
            const year = new Date(rma.monthYear).getFullYear();
            const month = new Date(rma.monthYear).getMonth() + 1;

            console.log('this is shown month' + month);
            // Include the year or month in the processed data based on the selected interval
            const intervalValue = selectedInterval === 'month' ? month : year;
            acc[intervalValue] = (acc[intervalValue] || 0) + rma.RMACount;

            return acc;
        }, {});

        // Convert the object into an array suitable for the chart
        let chartData = selectedInterval === 'month' ?
            uniqueMonths.map(month => {
                const count = processedData[month] || 0;
                return { label: monthNames[month - 1], count };
            }) :
            allYears.map(year => {
                const count = processedData[year] || 0;
                return { label: year.toString(), count };
            });

        updateChart(chartData);
    }


    function updateChart(chartData) {



        // Assuming chartData is an array of objects with monthYear and RMACount properties
        chart.data.labels = chartData.map(item => item.monthYear);
        chart.data.datasets[0].data = chartData.map(item => item.RMACount);
        console.log('this is some data : ' + chartData.map(item => item.RMACount));

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
                color: 'black'
            },
            ticks: {
                color: 'white',
                precision: 0,
               max: maxDataValue + 2,
                min: 0,
                beginAtZero: true
            }
        };


        // Update x-axis configuration for 'year' interval
        if (selectedInterval === 'month') {
            chart.options.scales.x.type = 'category';
            chart.options.scales.x.labels = monthNames;

            chart.options.scales.x.ticks = {
                color: 'white',
                min: monthNames[0],
                max: monthNames[11]
            };


        } else if (selectedInterval === 'week') {
            chart.options.scales.x.type = 'category';
            chart.options.scales.x.labels = weekDays;

            chart.options.scales.x.ticks = {
                color: 'white',
                min: weekDays[0],
                max: weekDays[6]
            };
        }else if (selectedInterval === 'year') {
            chart.options.scales.x.type = 'category';
            chart.options.scales.x.labels = years;

            chart.options.scales.x.ticks = {
                color: 'white',
                min: weekDays[0],
                max: weekDays[weekDays.length-1]
            };
        }


        else {
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
                        type: selectedInterval === 'month' ? 'category' : 'linear',
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
                        labels: selectedInterval === 'month' ?
                            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] :
                            undefined
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Number of RMA'
                        },
                        grid: {
                            color: 'black'
                        },
                        ticks: {
                            color: 'white',
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
                        display: true,
                        labels: {
                            generateLabels: function (chart) {
                                const originalLabels = Chart.overrides.pie.plugins.legend.labels.generateLabels(chart);
                                originalLabels.forEach(label => {
                                    const product = mostReturnedProducts.find(p => p.color === label.fillStyle);
                                    if (product) {
                                        label.text = product.name;
                                        label.textFill = 'white';

                                    }
                                });
                                return originalLabels;

                            },
                            color: 'white',
                        }
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

    :root {
        --color-blue: #3498db;
        --color-red: #e74c3c;
        --color-purple: #9b59b6;
        --color-light-blue: #95a5a6;
        --text-light: #ecf0f1;
        --text-dark: #2c3e50;
        --background-color: #ecf0f1;
        --box-shadow-color: rgba(0, 0, 0, 0.2);
    }

    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Arial', sans-serif;
        background-color: var(--background-color);
        color: var(--text-dark);
        line-height: 1.6;
    }


    .container {
        max-width: 95%;
        margin: 1rem auto;
        padding: 1rem;
    }

    .greeting {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--text-dark);
        text-align: center;
    }

    .line {
        width: 100%;
        height: 4px;
        background-color: var(--color-red);
        margin-bottom: 2rem;
    }

    .red-boxes {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .red-box {
        flex: 1;
        min-width: 250px;
        text-align: center;
        background-color: var(--color-purple);
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px var(--box-shadow-color);
        color: var(--text-light);
    }

    .big-number {
        font-size: 4rem;
        font-weight: bold;
        margin: 1rem 0;
    }


    .big-red-rectangle {
        position: relative;
        background-color: var(--color-blue);
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px var(--box-shadow-color);
        margin-bottom: 2rem;
    }

    #rmaChart, #pieChart {
        max-width: 100%;
        max-height: 400px;
    }

    .controls {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        gap: 10px;
        z-index: 10;
    }

    .controls button {
        background-color: var(--color-light-blue);
        border: none;
        border-radius: 0.3rem;
        color: var(--text-dark);
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .controls button:hover {
        background-color: var(--color-red);
    }


    @media (max-width: 768px) {
        .red-boxes {
            flex-direction: column;
        }

        .big-number {
            font-size: 3rem;
        }

        .controls button {
            padding: 0.3rem 0.6rem;
        }
    }

    @media (max-width: 480px) {
        .greeting {
            font-size: 1.5rem;
        }

        .big-number {
            font-size: 2.5rem;
        }
    }
</style>
