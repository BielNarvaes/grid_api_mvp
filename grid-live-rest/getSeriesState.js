const axios = require('axios');

const API_KEY = 'TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';
const seriesId = 2;

const url = `https://api-op.grid.gg/live-data-feed/series-state/${seriesId}`;

axios.get(url, {
  headers: {
    'x-api-key': API_KEY
  }
})
.then(response => {
  console.log('✅ Dados recebidos:\n');
  console.log(JSON.stringify(response.data, null, 2));
})
.catch(error => {
  console.error('❌ Erro na requisição:');
  console.error(error.response?.data || error.message);
});
