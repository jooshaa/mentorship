const express = require('express');
const app = express();
const sequelize = require('./config/db')
const config = require('config')
const indexRouter = require('./routes/index.route')
const cookieParser = require("cookie-parser");
const errorHandling = require('./middleware/errors/error.handling');
const logger = require('./utils/logger');

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
logger.info(`App running in ${process.env.NODE_ENV}`)
app.use(express.json());
app.use(cookieParser())
const port = config.get('port') ?? 3030

app.use('/api', indexRouter)
app.use(errorHandling)
//



const start = async ()=> {
   try{
     await sequelize.authenticate()
    logger.info("✅ Database connected");

    await sequelize.sync({alter: true});
    logger.info("✅ Models synchronized");

    app.listen(port, ()=>{
         logger.info(`🚀 Server running at http://localhost:${port}`);
    })
   }
   catch (error) {
    
    // logger.error("❌ Error starting server:", error);
  }

};

start()