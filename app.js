const express = require('express');
const app = express();
const sequelize = require('./config/db')
const config = require('config')

app.use(express.json());
const port = config.get('port') ?? 3030

const start = async ()=> {
   try{
     await sequelize.authenticate()
    console.log("✅ Database connected");

    await sequelize.sync({alter: true});
    console.log("✅ Models synchronized");

    app.listen(port, ()=>{
         console.log(`🚀 Server running at http://localhost:${port}`);
    })
   }
   catch (error) {
    console.error("❌ Error starting server:", error);
  }

};

start()