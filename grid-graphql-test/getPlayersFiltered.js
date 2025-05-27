const { request, gql } = require('graphql-request');

const API_KEY = 'TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';
const endpoint = 'https://api-op.grid.gg/central-data/graphql';

const query = gql`
  query {
    players(first: 50) {
      edges {
        node {
          id
          nickname
          title {
            nameA
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
    const allPlayers = data.players.edges.map(edge => edge.node);

    const csPlayers = allPlayers.filter(p => p.title.name === 'Counter Strike: Global Offensive').slice(0, 25);
    const lolPlayers = allPlayers.filter(p => p.title.name === 'League of Legends').slice(0, 25);

    console.log('\n🎯 Jogadores de CS:GO:\n');
    csPlayers.forEach(p =>
      console.log(`ID: ${p.id} | Nick: ${p.nickname} | Jogo: ${p.title.name}`)
    );

    console.log('\n🎮 Jogadores de League of Legends:\n');
    lolPlayers.forEach(p =>
      console.log(`ID: ${p.id} | Nick: ${p.nickname} | Jogo: ${p.title.name}`)
    );
  })
  .catch(err => {
    console.error('❌ Erro na requisição:');
    if (err.response?.errors) {
      console.error(err.response.errors);
    } else {
      console.error(err);
    }
  });
