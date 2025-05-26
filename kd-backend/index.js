const express = require('express');
const { request, gql } = require('graphql-request');

const app = express();

// CORS manual para funcionar no Codespaces
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://sturdy-journey-9p97qg95j66hpp6j-3000.app.github.dev');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const PORT = 4000;
const ENDPOINT = 'https://api.grid.gg/v1/graphql';
const API_KEY = 'TXsrL2e3ZwoqWLKDcMHNWaN4FqCpOtvJltq0LAm4';

app.get('/kd/:playerId', async (req, res) => {
  const playerId = req.params.playerId;

  const query = gql`
    query {
      gamePlayerStatesCsgo(filter: {playerId: "${playerId}"}, limit: 5) {
        name
        kills
        deaths
      }
    }
  `;

  try {
    const data = await request(ENDPOINT, query, {}, {
      Authorization: `Bearer ${API_KEY}`
    });

    const result = data.gamePlayerStatesCsgo.map(p => ({
      name: p.name,
      kd: p.deaths ? (p.kills / p.deaths).toFixed(2) : p.kills
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar dados da GRID API');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
