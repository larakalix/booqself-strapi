// module.exports = ({ env }) => ({
//   connection: {
//     client: "postgres",
//     connection: {
//       host: env("PGHOST", "127.0.0.1"),
//       port: env.int("PGPORT", 5432),
//       database: env("PGDATABASE", "strapi"),
//       user: env("PGUSER", "strapi"),
//       password: env("PGPASSWORD", "password"),
//       ssl: env.bool(true),
//     },
//     pool: { min: 0 },
//   },
// });
const path = require("path");

module.exports = () => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: path.join(__dirname, "..", ".tmp/data.db"),
    },
    useNullAsDefault: true,
  },
});
