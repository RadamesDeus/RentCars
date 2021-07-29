import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// interface IOptions {
//   host: string;
// }

// getConnectionOptions().then(options => {
//   const newOptions = options as IOptions;
//   newOptions.host = 'localhost'; // process.env.PG_HOST ||
//   createConnection({
//     ...options,
//   });
// });

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      database: 'rentcarsDB_Test', // NODE_ENV === 'test' ? 'rentcarsDB_Test' : defaultOptions.database,
    }),
  );
};
