const { request, gql } = require('graphql-request');

const API_KEY = 'TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';
const endpoint = 'https://api-op.grid.gg/central-data/graphql';

const query = gql`
  fragment playerFields on Player {
    id
    nickname
    title {
      name
    }
  }

  query GetPlayers {
    players(first: 5) {
      edges {
        node {
          ...playerFields
        }
      }
    }
  }
`;

const headers = {
  'x-api-key': API_KEY,
};

request(endpoint, query, {}, headers)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => {
    console.error('❌ Erro na requisição:');
    if (err.response?.errors) {
      console.error(err.response.errors);
    } else {
      console.error(err);
    }
  });

