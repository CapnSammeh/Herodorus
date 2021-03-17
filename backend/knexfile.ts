module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DEV_DATABASE_URL,
    migrations: {
      directory: './db/migrations',
      extensions: 'tx'
    },
    seeds: {
      directory: './db/seeds/development',
      extensions: 'tx'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
    migrations: {
      directory: './db/migrations',
      extensions: 'tx'
    },
    seeds: {
      directory: './db/seeds/test',
      extensions: 'tx'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'pg',
    connection: process.env.STAGING_DATABASE_URL,
    migrations: {
      directory: './db/migrations',
      extensions: 'tx'
    },
    seeds: {
      directory: './db/seeds/staging',
      extensions: 'tx'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations',
      extensions: 'tx'
    },
    seeds: {
      directory: './db/seeds/production',
      extensions: 'tx'
    },
    useNullAsDefault: true
  }

};
