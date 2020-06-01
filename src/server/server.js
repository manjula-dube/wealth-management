const express = require('express');
const cors = require('cors');

const data = require('./data.json');

// create server
const server = express();
// use it before all route definitions
server.use(cors({ origin: 'http://localhost:4500' }));

const port = 4000;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const RiskLevels = [
  {
    risk: 'Risk Level 1 - Low',
    description:
      'A conservative set of investments designed to result in slow growth over time',
    otherRiskOptions: ['Risk Level 2 - Medium', 'Risk Level 3 - High'],
  },
  {
    risk: 'Risk Level 2 - Medium',
    description:
      'A mix of investments designed to result in average growth over time',
    otherRiskOptions: ['Risk Level 1 - Low', 'Risk Level 3 - High'],
  },
  {
    risk: 'Risk Level 3 - High',
    description: 'Stocks only. No bonds or cash',
    otherRiskOptions: ['Risk Level 1 - Low', 'Risk Level 2 - Medium'],
  },
];

// GET question endpoint
server.get('/api/questions', (req, res) => {
  res.json(data);
});

server.post('/submit/risk-questions', (req, res) => {
  const riskItem = RiskLevels[getRandomInt(3)];
  return res.send(riskItem);
});

server.post('/store/risk-level', (req, res) => {
  return res.send('Stored successfully');
});

// starting server
server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
