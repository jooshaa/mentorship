const express = require('express');
const app = express();
const sequelize = require('./config/db')
const config = require('config')
const indexRouter = require('./routes/index.route')
const cookieParser = require("cookie-parser");
const errorHandling = require('./middleware/errors/error.handling');

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
console.log(process.env.NODE_ENV)
app.use(express.json());
app.use(cookieParser())
const port = config.get('port') ?? 3030

app.use('/api', indexRouter)
app.use(errorHandling)




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