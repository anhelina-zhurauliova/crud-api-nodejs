import { createServer } from 'http';
import cluster from 'cluster';
import { cpus } from 'os';
import 'dotenv/config';

import { requestListener } from './utils/requestListener';

const port = process.env.PORT;
const withClusters = process.env.NODE_ENV === 'multi';

const main = () => {
  if (cluster.isPrimary && withClusters) {
    cpus().forEach(() => {
      cluster.fork();
    });

    cluster.on('exit', function (worker) {
      console.log('Worker %d died', worker.id);

      cluster.fork();
    });
  } else {
    const server = createServer(requestListener);

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      withClusters && console.log('Worker %d running!', cluster.worker.id);
    });
  }
};

main();
