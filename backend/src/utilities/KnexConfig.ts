import dotenv from 'dotenv';
dotenv.config({path: ".env"});

export namespace KnexConfig {
    export const environments = {
        development: {
            client: 'pg',
            connection: process.env.DEV_DATABASE_URL,
            migrations: {
                directory: './db/migrations',
                extension: 'ts',
            },
            seeds: {
                directory: './db/seeds/dev',
            },
            useNullAsDefault: true,
        },
        test: {
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
            migrations: {
                directory: './db/migrations',
                extension: 'ts',
            },
            seeds: {
                directory: './db/seeds/test',
            },
            useNullAsDefault: true,
        },
        staging: {
            client: 'pg',
            connection: process.env.STAGING_DATABASE_URL,
            migrations: {
                directory: './db/migrations',
                extension: 'ts',
            },
            seeds: {
                directory: process.env.SEEDS_DIR,
            },
            useNullAsDefault: true,
        },

        production: {
            client: 'pg',
            connection: process.env.PRODUCTION_DATABASE_URL,
            migrations: {
                directory: './db/migrations',
                extension: 'ts',
            },
            seeds: {
                directory: process.env.SEEDS_DIR,
            },
            useNullAsDefault: true,
        },
    };
}
