module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.APP_DB_HOST,
  port: process.env.APP_DB_PORT,
  username: process.env.APP_DB_USER,
  password: process.env.APP_DB_PASS,
  database: process.env.APP_DB_NAME,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/database/migrations'
  }
}
