const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conexDB
        this.conectarDB();


        //middlewares
        this.middlewares();

        //routes
        this. routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        this.app.use( cors())

        //read and parse
        this.app.use( express.json() )

        this.app.use(express.static('public') );
    }

    routes(){   

        this.app.use(this.usuariosPath, require('../routes/usuarios') )
    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto', this.port)
        })
    }

}

module.exports = Server;