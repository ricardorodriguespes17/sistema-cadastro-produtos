import knex from 'knex';
import configuration from '../../knexfile';

const settings = configuration.development;

const connection = knex(settings);

export default connection;