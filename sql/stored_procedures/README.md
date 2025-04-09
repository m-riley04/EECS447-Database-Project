# stored_procedures
This directory is used for containing stored procedures. A stored procedure is SQL code that is saved and can be reused *within SQL*.
If you need more information on what a stored procedure is, go [here](https://www.w3schools.com/sql/sql_stored_procedures.asp) or [here for MariaDB specific](https://mariadb.com/kb/en/create-procedure/).

# Naming Conventions
- Each script FILE must be prefixed with "sp_".
- Each stored procedure must be prefixed with "sp" and be in *camel case*

So the file name should have the format:
```
sp_procedure_name
```

And the stored procedure name should have the format:
```
spProcedureName
```

# Example Syntax
Inside the stored procedure file:
```sql
DELIMITER //

CREATE PROCEDURE spProcedureName([params])
BEGIN
    [sql_statement]
END //

DELIMITER;
```

Then to use it elsewhere:
```sql
EXEC spProcedureName @[parameter] = [value];
```