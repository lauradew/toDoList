require('dotenv').config();

const ENV = process.env.ENV || "development";

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://deekdvaxxnoykt:af1443e9b400cf73755cea02c9dc018b3ceb5f48b99ec2dc36acb9baf24b0afa@ec2-23-21-229-48.compute-1.amazonaws.com:5432/d5lup1ib1lbfss?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
