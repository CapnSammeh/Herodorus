import Knex from 'knex';
import { KnexConfig } from '../src/utilities/KnexConfig';

import dotenv from 'dotenv';
dotenv.config();

export interface DataClient {
  postgres: Knex;
}

async function create(): Promise<DataClient> {
  return {
    postgres: await initDbProvider(),
  };
}

async function initTestDbEnv(): Promise<Knex> {
  return Knex(KnexConfig.environments.test)
    .raw(
      `
      DROP SCHEMA IF EXISTS public CASCADE;
      CREATE SCHEMA public;
    `,
    )
    .then(() => {
      return Knex(KnexConfig.environments.test).migrate.latest();
    })
    .then(() => {
      return Knex(KnexConfig.environments.test);
    });
}

async function initDbProvider(): Promise<Knex> {
  let knex: Knex;
  if (process.env.ENVIRONMENT == 'test') knex = await initTestDbEnv();
  else if (process.env.ENVIRONMENT == 'staging') knex = Knex(KnexConfig.environments.staging);
  else if (process.env.ENVIRONMENT == 'production') knex = Knex(KnexConfig.environments.production);
  else knex = Knex(KnexConfig.environments.development);

  // Verify the connection before proceeding
  try {
    await knex.raw('SELECT now()');
    console.log('DB connection successful');
    return knex;
  } catch (error) {
    throw new Error('Unable to connect to Postgres via Knex. Ensure a valid connection.');
  }
}

export default { create };
