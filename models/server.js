const express= require('express');
const cors= require('cors');
const { usersRouter } = require('../routes/users.routes');
const { repairsRouter } = require('../routes/repairs.routes');
const { db } = require('../database/db');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');
const morgan = require('morgan');

class Server{
constructor(){
    this.app=express();
    this.port= process.env.PORT || 3000;

    this.paths={
        users: '/api/v1/users',
        repairs: '/api/v1/repairs'
    }
    this.database();
    this.middlewares();

    this.routes();
}
middlewares(){
    if (process.env.NODE_ENV === 'development') {
    this.app.use(morgan('dev'));
    }
    //UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API
    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
}
routes(){
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.repairs, repairsRouter);
    this.app.all('*', (req, res, next) => {
    return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
  });

  this.app.use(globalErrorHandler);

}
database(){
    db.authenticate()
    .then(()=>console.log('Database Authenticated'))
    .catch(error=>console.log(error));

    db.sync()
    .then(()=>console.log('Database synced'))
    .catch(error=>console.log(error));
}
listen(){
    this.app.listen(this.port,()=>{
        console.log(`Server listening on port ${this.port}`);
    });
}


}
module.exports= Server;