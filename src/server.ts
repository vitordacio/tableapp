import { server } from './app';

server.listen(process.env.PORT || 3333, async () => {
  /* eslint-disable no-console */
  console.log(`🚀 Server started on port ${process.env.PORT || 3333}!`);
});
