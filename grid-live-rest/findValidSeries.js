const { request, gql } = require('graphql-request');
const axios = require('axios');

const API_KEY = 'TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';

const graphqlEndpoint = 'https://api-op.grid.gg/central-data/graphql';
const restBaseUrl = 'https://api-op.grid.gg/live-data-feed/series-state';

const headers = { 'x-api-key': API_KEY };

const query = gql`
  query {
    series(first: 20, filter: { finished: false }) {
      edges {
        node {
          id
          title { name }
          tournament { name }
        }
      }
    }
  }
`;

(async () => {
  try {
    const data = await request(graphqlEndpoint, query, {}, headers);
    const seriesList = data.series.edges.map(edge => edge.node);

    console.log(`🔍 Testando ${seriesList.length} séries...\n`);

    for (const series of seriesList) {
      const url = `${restBaseUrl}/${series.id}`;
      try {
        const res = await axios.get(url, { headers });
        if (res.status === 200) {
          console.log(`✅ Série ID ${series.id} | ${series.title.name} | ${series.tournament.name}`);
        }
      } catch (e) {
        // Ignora séries que dão erro
      }
    }
  } catch (err) {
    console.error('❌ Erro ao buscar séries:', err.response?.errors || err.message);
  }
})();
