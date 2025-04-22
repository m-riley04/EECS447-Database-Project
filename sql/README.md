# sql
This directory contains the SQL queries that we use to create and access the database and it's tables.

# Database Setup
To setup the database from scratch, follow the following steps:
1. Run the `trans_createTables.sql` transaction to create the tables and constraints
    - If you already created the tables, you must run `trans_dropTables.sql` first.
2. Run each of the stored procedures declarations in the `functions` folder. This is so that they are loaded into the database.
3. Run the `trans_populate.sql` transaction. This will populate all of the tables with dummy data.
    - NOTE: Because most of the required stored procedures do not exist yet, it will not populate all of the tables.