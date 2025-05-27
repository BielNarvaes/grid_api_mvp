const { request, gql } = require('graphql-request');

const API_KEY = 'TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';
const endpoint = 'https://api-op.grid.gg/central-data/graphql';

const query = gql`
  query {
    titles {
      id
      name
    }
  }
`;

const headers = {
  'x-api-key': API_KEY,
};

request(endpoint, query, {}, headers)
  .then(data => {
    console.log('🎮 Títulos disponíveis:\n');
    data.titles.forEach(title => {
      console.log(`ID: ${title.id} | Nome: ${title.name}`);
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
