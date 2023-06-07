const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});


/*
creating a new schema in the database using Sequelize ORM. The code imports the sequelize instance from the db/models file. Then, the showAllSchemas() method is called on the sequelize instance which returns an array of all the schemas in the database. The data is then checked to see if the current schema is already present in the database. If it is not, then a new schema is created using the createSchema() method.
*/
