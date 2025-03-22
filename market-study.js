  // Market Study page functionality
  let charts = {};
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
      initializeCharts();
  });
  
  function initializeCharts() {
      // Initialize empty charts
      charts.marketSize = new Chart(document.getElementById('marketSizeChart'), {
          type: 'line',
          data: {
              labels: [],
              datasets: [{
                  label: 'Market Size ($B)',
                  data: [],
                  borderColor: '#3a86ff',
                  tension: 0.4
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      position: 'top',
                  }
              }
          }
      });
  
      charts.competitor = new Chart(document.getElementById('competitorChart'), {
          type: 'radar',
          data: {
              labels: [],
              datasets: [{
                  label: 'Market Share (%)',
                  data: [],
                  backgroundColor: 'rgba(58, 134, 255, 0.2)',
                  borderColor: '#3a86ff',
              }]
          },
          options: {
              responsive: true,
              scales: {
                  r: {
                      beginAtZero: true,
                      max: 100
                  }
              }
          }
      });
  
      charts.segment = new Chart(document.getElementById('segmentChart'), {
          type: 'doughnut',
          data: {
              labels: [],
              datasets: [{
                  data: [],
                  backgroundColor: [
                      '#3a86ff',
                      '#8338ec',
                      '#ff006e',
                      '#fb5607',
                      '#ffbe0b'
                  ]
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      position: 'right',
                  }
              }
          }
      });
  
      charts.trend = new Chart(document.getElementById('trendChart'), {
          type: 'bar',
          data: {
              labels: [],
              datasets: [{
                  label: 'Growth Rate (%)',
                  data: [],
                  backgroundColor: '#3a86ff'
              }]
          },
          options: {
              responsive: true,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }
  
  function analyzeMarket() {
      const domain = document.getElementById('domainInput').value.trim();
      
      if (!domain) {
          alert('Please enter a business domain');
          return;
      }
  
      // Show loading state
      document.getElementById('loadingOverlay').style.display = 'flex';
      document.getElementById('analysisResults').style.display = 'none';
  
      // Simulate API call delay
      setTimeout(() => {
          // Generate mock data based on domain
          const data = generateMarketData(domain);
          
          // Update charts
          updateCharts(data);
          
          // Update insights
          updateInsights(data);
  
          // Hide loading, show results
          document.getElementById('loadingOverlay').style.display = 'none';
          document.getElementById('analysisResults').style.display = 'block';
      }, 2000);
  }
  
  function generateMarketData(domain) {
      // Mock data generation based on domain
      return {
          marketSize: {
              labels: ['2021', '2022', '2023', '2024', '2025'],
              data: [10, 12, 15, 18, 22]
          },
          competitors: {
              labels: ['Company A', 'Company B', 'Company C', 'Company D', 'Company E'],
              data: [30, 25, 20, 15, 10]
          },
          segments: {
              labels: ['Enterprise', 'SMB', 'Consumer', 'Government', 'Education'],
              data: [35, 25, 20, 12, 8]
          },
          trends: {
              labels: ['Digital Transformation', 'AI Integration', 'Sustainability', 'Remote Solutions', 'Security'],
              data: [15, 25, 10, 20, 18]
          },
          insights: [
              `The ${domain} market is expected to grow at a CAGR of 15% over the next 5 years.`,
              'Digital transformation and AI integration are the key growth drivers.',
              'Enterprise segment presents the highest revenue opportunity.',
              'Market consolidation expected through M&A activities.',
              'Emerging markets show significant growth potential.'
          ]
      };
  }
  
  function updateCharts(data) {
      // Update Market Size Chart
      charts.marketSize.data.labels = data.marketSize.labels;
      charts.marketSize.data.datasets[0].data = data.marketSize.data;
      charts.marketSize.update();
  
      // Update Competitor Chart
      charts.competitor.data.labels = data.competitors.labels;
      charts.competitor.data.datasets[0].data = data.competitors.data;
      charts.competitor.update();
  
      // Update Segment Chart
      charts.segment.data.labels = data.segments.labels;
      charts.segment.data.datasets[0].data = data.segments.data;
      charts.segment.update();
  
      // Update Trend Chart
      charts.trend.data.labels = data.trends.labels;
      charts.trend.data.datasets[0].data = data.trends.data;
      charts.trend.update();
  }
  
  function updateInsights(data) {
      const insightsContainer = document.getElementById('keyInsights');
      insightsContainer.innerHTML = data.insights.map(insight => `
          <div class="insight-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <p>${insight}</p>
          </div>
      `).join('');
  }