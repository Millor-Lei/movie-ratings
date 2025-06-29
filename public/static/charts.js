let chartInstance;  // Reference to the Chart.js chart

// Fetch ratings and update chart
async function updateChart() {
  try {
    const response = await fetch('/api/ratings');
    const data = await response.json();

    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    data.forEach(entry => {
      const rating = parseInt(entry.rating);
      if (ratingCounts.hasOwnProperty(rating)) {
        ratingCounts[rating]++;
      }
    });

    const chartData = Object.values(ratingCounts);

    if (chartInstance) {
      // If chart already exists, update it
      chartInstance.data.datasets[0].data = chartData;
      chartInstance.update();
    } else {
      // Create chart for the first time
      const ctx = document.getElementById('ratingChart').getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
          datasets: [{
            label: 'Number of Ratings',
            data: chartData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Rating'
              }
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("Error loading chart data:", error);
  }
}

// Run once on page load
document.addEventListener("DOMContentLoaded", updateChart);
