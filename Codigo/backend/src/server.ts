import cors from 'cors';
import express from 'express';
import routes from './routes';
import environment from './common/environment';

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors({ origin: false }));

app.listen(environment.server.port, () => {
  console.log(`Server started on port ${environment.server.port}!`);
});
