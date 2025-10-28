Database setup for BPC POS System (server)

1. Install dependencies (from server folder):
   npm install

2. Create a MySQL database and user, or use local root. Update `.env` based on `.env.example`.

3. Initialize the schema & sample data:

   - Use the MySQL client or a GUI and run the `db_init.sql` script in the `server/` folder.
     Example using mysql client:

   mysql -u root -p < db_init.sql

   or connect first then:
   mysql -u root -p

   > SOURCE db_init.sql;

4. Test the connection (from server folder):
   node test-db-conn.js

Files added/edited:

- db.js (exports connection pool and query helper)
- db_init.sql (schema + sample data)
- test-db-conn.js (simple connection test)
- .env.example (example environment variables)

Notes:

- This project uses the `mysql2` package and the promise API.
- Keep `.env` out of source control; do not commit credentials.
- If you want migrations, consider using a migration tool like `knex`, `sequelize-cli` or `umzug`.
