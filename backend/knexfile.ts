// Update with your config settings.
import { KnexConfig } from './src/utilities/KnexConfig';

module.exports = {
  test: KnexConfig.environments.test,
  development: KnexConfig.environments.development,
  staging: KnexConfig.environments.staging,
  production: KnexConfig.environments.production,
};