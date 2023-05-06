import express from 'express';
import { calculator, Operation } from './calculator';

const app = express();
app.use(express.json())
app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  const operation = op as Operation;

  const result = calculator(Number(value1), Number(value2), operation);

  res.send({ result });
});