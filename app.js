const { createApp } = Vue;

createApp({
    data() {
        return {
            menuActive: false,
            selectedFuel: 'petrol92',
            fuelTypes: [],
            stats: {
                highest: 0,
                lowest: 0,
                average: 0,
                changes: 0
            },
            lastUpdated: ''
        };
    },

    created() {
        this.chart = null;
    },

    mounted() {
        this.loadFuelData();
        this.updateLastUpdated();

        // Update time every minute
        setInterval(() => {
            this.updateLastUpdated();
        }, 60000);
    },

    methods: {
        async loadFuelData() {
            try {
                // Load all fuel type data
                const fuelIds = ['petrol92', 'petrol95', 'autodiesel', 'superdiesel', 'kerosene'];
                const promises = fuelIds.map(id => this.loadFuelType(id));

                const results = await Promise.all(promises);
                this.fuelTypes = results;

                // Initialize chart with first fuel type
                this.initChart();
            } catch (error) {
                console.error('Error loading fuel data:', error);
                // Load default data if files don't exist
                this.loadDefaultData();
            }
        },

        async loadFuelType(id) {
            try {
                const response = await fetch(`data/${id}.json`);
                const data = await response.json();

                // Calculate derived values from history
                if (data.history && data.history.length > 0) {
                    // Get current price from last entry in history
                    const currentPrice = data.history[data.history.length - 1].price;

                    // Get previous price (second to last entry, or same as current if only one entry)
                    const previousPrice = data.history.length > 1
                        ? data.history[data.history.length - 2].price
                        : currentPrice;

                    // Calculate change
                    const change = parseFloat((currentPrice - previousPrice).toFixed(2));

                    // Calculate change percentage
                    const changePercent = previousPrice !== 0
                        ? parseFloat(((change / previousPrice) * 100).toFixed(2))
                        : 0;

                    // Get last updated date from last entry
                    const lastUpdated = data.history[data.history.length - 1].date;

                    // Add calculated values to data object
                    data.currentPrice = currentPrice;
                    data.change = change;
                    data.changePercent = changePercent;
                    data.lastUpdated = lastUpdated;
                }

                return data;
            } catch (error) {
                console.error(`Error loading ${id}:`, error);
                return this.getDefaultFuelData(id);
            }
        },

        getDefaultFuelData(id) {
            const defaults = {
                petrol92: {
                    id: 'petrol92',
                    name: 'Petrol 92 Octane',
                    type: 'Unleaded Petrol',
                    icon: 'fa-gas-pump',
                    iconClass: 'icon-petrol-92',
                    currentPrice: 395.00,
                    change: -5.00,
                    changePercent: -1.25,
                    history: this.generateSampleHistory(395, 30)
                },
                petrol95: {
                    id: 'petrol95',
                    name: 'Petrol 95 Octane',
                    type: 'Premium Petrol',
                    icon: 'fa-gas-pump',
                    iconClass: 'icon-petrol-95',
                    currentPrice: 425.00,
                    change: -3.00,
                    changePercent: -0.70,
                    history: this.generateSampleHistory(425, 30)
                },
                autodiesel: {
                    id: 'autodiesel',
                    name: 'Auto Diesel',
                    type: 'Standard Diesel',
                    icon: 'fa-truck',
                    iconClass: 'icon-auto-diesel',
                    currentPrice: 380.00,
                    change: 0,
                    changePercent: 0,
                    history: this.generateSampleHistory(380, 30)
                },
                superdiesel: {
                    id: 'superdiesel',
                    name: 'Super Diesel',
                    type: 'Premium Diesel',
                    icon: 'fa-truck-monster',
                    iconClass: 'icon-super-diesel',
                    currentPrice: 405.00,
                    change: 2.00,
                    changePercent: 0.50,
                    history: this.generateSampleHistory(405, 30)
                },
                kerosene: {
                    id: 'kerosene',
                    name: 'Kerosene',
                    type: 'Household Fuel',
                    icon: 'fa-fire',
                    iconClass: 'icon-kerosene',
                    currentPrice: 195.00,
                    change: -1.00,
                    changePercent: -0.51,
                    history: this.generateSampleHistory(195, 30)
                }
            };

            return defaults[id];
        },

        generateSampleHistory(basePrice, days) {
            const history = [];
            const today = new Date();

            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);

                // Generate realistic price variations
                const variation = (Math.random() - 0.5) * 20;
                const price = parseFloat((basePrice + variation).toFixed(2));

                history.push({
                    date: date.toISOString().split('T')[0],
                    price: price
                });
            }

            return history;
        },

        loadDefaultData() {
            const fuelIds = ['petrol92', 'petrol95', 'autodiesel', 'superdiesel', 'kerosene'];
            this.fuelTypes = fuelIds.map(id => this.getDefaultFuelData(id));
            this.initChart();
        },

        toggleMenu() {
            this.menuActive = !this.menuActive;
        },

        scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                this.menuActive = false;
            }
        },

        selectFuel(fuelId) {
            this.selectedFuel = fuelId;
            this.updateChart();
        },

        showChart(fuelId) {
            this.selectedFuel = fuelId;
            this.scrollToSection('charts');
            setTimeout(() => {
                this.updateChart();
            }, 500);
        },

        getPriceChangeClass(change) {
            if (change > 0) return 'increase';
            if (change < 0) return 'decrease';
            return 'neutral';
        },

        initChart() {
            const ctx = document.getElementById('priceChart');
            if (!ctx) return;

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Price (Rs.)',
                        data: [],
                        borderColor: '#FFD700',
                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#000000',
                        pointBorderColor: '#FFD700',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: '#FFFFFF', // White text
                                font: {
                                    family: 'Inter',
                                    size: 14,
                                    weight: '500'
                                },
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            titleColor: '#FFD700',
                            bodyColor: '#FFFFFF',
                            padding: 12,
                            titleFont: {
                                size: 14,
                                weight: '600'
                            },
                            bodyFont: {
                                size: 13
                            },
                            borderColor: '#FFD700',
                            borderWidth: 1,
                            displayColors: false,
                            callbacks: {
                                label: function (context) {
                                    return 'Rs. ' + context.parsed.y.toFixed(2);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                color: '#B0B0B0', // Grey text
                                callback: function (value) {
                                    return 'Rs. ' + value;
                                },
                                font: {
                                    family: 'Inter',
                                    size: 12
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)' // Light grey grid
                            }
                        },
                        x: {
                            ticks: {
                                color: '#B0B0B0', // Grey text
                                font: {
                                    family: 'Inter',
                                    size: 12
                                },
                                maxRotation: 45,
                                minRotation: 45
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });

            this.updateChart();
        },

        updateChart() {
            if (!this.chart) return;

            const fuel = this.fuelTypes.find(f => f.id === this.selectedFuel);
            if (!fuel || !fuel.history) return;

            // Update chart data
            this.chart.data.labels = fuel.history.map(h => {
                const date = new Date(h.date);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            });

            this.chart.data.datasets[0].data = fuel.history.map(h => h.price);
            this.chart.data.datasets[0].label = `${fuel.name} Price (Rs.)`;

            // Strict Black & Yellow Theme
            const themeColor = '#FFD700'; // Yellow
            const themeBg = 'rgba(255, 215, 0, 0.1)'; // Yellow transparent

            this.chart.data.datasets[0].borderColor = themeColor;
            this.chart.data.datasets[0].backgroundColor = themeBg;
            this.chart.data.datasets[0].pointBackgroundColor = '#000000'; // Black points
            this.chart.data.datasets[0].pointBorderColor = themeColor; // Yellow borders
            this.chart.data.datasets[0].pointHoverBackgroundColor = themeColor;
            this.chart.data.datasets[0].pointHoverBorderColor = '#FFFFFF';

            this.chart.update();

            // Update statistics
            this.updateStats(fuel.history);
        },

        updateStats(history) {
            if (!history || history.length === 0) return;

            const prices = history.map(h => h.price);
            const highest = Math.max(...prices);
            const lowest = Math.min(...prices);
            const average = prices.reduce((a, b) => a + b, 0) / prices.length;

            // Count price changes
            let changes = 0;
            for (let i = 1; i < history.length; i++) {
                if (history[i].price !== history[i - 1].price) {
                    changes++;
                }
            }

            this.stats = {
                highest: highest.toFixed(2),
                lowest: lowest.toFixed(2),
                average: average.toFixed(2),
                changes: changes
            };
        },

        updateLastUpdated() {
            const now = new Date();
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Colombo'
            };

            this.lastUpdated = now.toLocaleString('en-US', options) + ' (Sri Lanka Time)';
        }
    }
}).mount('#app');
