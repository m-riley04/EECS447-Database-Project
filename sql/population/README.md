# population
This directory is for storing SQL scripts to insert the testing/placeholder data.

# Naming Conventions
Each population script file should be prepended with "pop_", and should be followed by the table name that it is populating. If there are multiple population scripts for a single table, you can add another name, word, or number to the end.

So the full format would look like this:

```
pop_[table_name]_[optional_name]
```