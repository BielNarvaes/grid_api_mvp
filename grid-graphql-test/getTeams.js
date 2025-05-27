const { request, gql } = require('graphql-request');

const API_KEY = 'TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';
const endpoint = 'https://api-op.grid.gg/central-data/graphql';

const query = gql`
  query {
    teams(first: 10) {
      edges {
        node {
          id
          name
          titles {
            name
          }
        }
      }
    }
  }
`;

const headers = {
  'x-api-key': API_KEY,
};

request(endpoint, query, {}, headers)
  .then(data => {
    console.log('✅ Times encontrados:\n');
    data.teams.edges.forEach(({ node }) => {
      console.log(`ID: ${node.id} | Nome: ${node.name} | Jogo(s): ${node.titles.map(t => t.name).join(', ')}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro na requisição:');
    if (err.response?.errors) {
      console.error(err.response.errors);
    } else {
      console.error(err);
    }
  });
