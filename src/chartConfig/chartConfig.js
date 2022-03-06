
function chartConfig() {
    let delayed;
    const config = {
        options: {
            interaction: {
                intersect: false
            },
            responsive: true,
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                      delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                  },
            },
            hoverRadius: 12
        },
        scales: {
            y: {
                type: "linear",
                ticks: {
                    callback: (value) => {
                        return "€ " + value;
                    }
                }
            },
            x: {
                    type: "timeseries",
                    ticks: {
                        major: {
                            enable: true
                        }
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }            
        }
    };
  return {config}
}

export default chartConfig;