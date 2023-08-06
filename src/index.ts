import { createConnection } from 'typeorm';
import { AppError } from '@utils/AppError';

createConnection()
  .then(() => {
    import('./server');
  })
  .catch(
    () => new AppError('Não foi possivel se comunicar com o banco de dados.'),
  );
