const express = require('express');
const cors = require('cors');
const { request, gql } = require('graphql-request');

const app = express();

app.use(cors({
  origin: 'https://5000-cuddly-space-cod-6944vw9rgv2r97q.github.dev'
}));

const endpoint = 'https://api.grid.gg/file-download/end-state/grid/series/2589176?key=TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';
const apiKey = 'TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';

app.get('/stats', async (req, res) => {
  const query = gql`
    query {
      game(id: "2589176") {
        playerStates {
          ... on GamePlayerStateCsgo {
            name
            kills
            deaths
          }
        }
      }
    }
  `;

  try {
    const data = await request(endpoint, query, {}, {
      'x-api-key': apiKey
    });

    const kdData = {};

    data.game.playerStates.forEach(player => {
      const kills = player.kills || 0;
      const deaths = player.deaths || 1; // evita divisão por zero
      const kd = (kills / deaths).toFixed(2);
      kdData[player.name] = kd;
    });

    res.json(kdData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados da GRID API' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/stats`);
});
