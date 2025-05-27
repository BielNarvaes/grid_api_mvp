const { request, gql } = require('graphql-request');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');


const API_KEY = 'TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';
const endpoint = 'https://api-op.grid.gg/live-data-feed/series-state/graphql';


const SERIES_ID = "6";

const query = gql`
  query {
    seriesState(id: "${SERIES_ID}") {
      valid
      updatedAt
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
  .then(async (data) => {
    const players = [];

    if (!data.seriesState || !data.seriesState.games) {
      console.log('⚠️ Nenhum dado disponível para esta série.');
      return;
    }

    data.seriesState.games.forEach(game => {
      game.teams.forEach(team => {
        team.players.forEach(player => {
          const kd = player.deaths === 0 ? player.kills : (player.kills / player.deaths).toFixed(2);
          players.push({
            name: player.name,
            kd: parseFloat(kd)
          });
        });
      });
    });

    if (players.length === 0) {
      console.log('⚠️ Nenhum jogador com dados disponíveis.');
      return;
    }

    // 📊 Gerar gráfico
    const chart = new ChartJSNodeCanvas({ width: 800, height: 600 });
    const config = {
      type: 'bar',
      data: {
        labels: players.map(p => p.name),
        datasets: [{
          label: 'K/D',
          data: players.map(p => p.kd),
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `K/D dos jogadores - Série ${SERIES_ID}`
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    };

    const image = await chart.renderToBuffer(config);
    fs.writeFileSync('kd-chart.png', image);
    console.log('✅ Gráfico salvo: kd-chart.png');
  })
  .catch(err => {
    console.error('❌ Erro na requisição:', err.response?.errors || err.message);
  });
