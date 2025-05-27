const { request, gql } = require('graphql-request');

const API_KEY = 'TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';
const endpoint = 'https://api-op.grid.gg/live-data/graphql';

const query = gql`
  query {
    seriesState(id: "2") {
      valid
      updatedAt
      format
      started
      finished
      teams {
        name
        won
      }
      games(filter: { started: true, finished: false }) {
        sequenceNumber
        teams {
          name
          players {
            name
            kills
            deaths
            netWorth
            money
            position {
              x
              y
            }
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
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error('❌ Erro na requisição:', err.response?.errors || err);
  });
