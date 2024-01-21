import express, { Router } from 'express'
import { RabbitMq } from '../infrastructure/eventBus/rabbitmq';
import { SequelizeEvent } from '../infrastructure/database/models/Events';
import { SequelizeField } from '../infrastructure/database/models/Fields';
import { SequelizeProperty } from '../infrastructure/database/models/Properties';
import { io } from '../infrastructure/socket/io';
import http from 'http'
import { sequelize } from '../infrastructure/database/sequelize';

interface Options{
    port?: number;
    routes: Router;
}

export class Server {
    public readonly app = express()
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options){
        const {port = 3000, routes} = options;
        this.port = port;
        this.routes = routes;
    }

    async start(){
        //middlewares
        this.app.use(express.json())

        this.app.use(this.routes)        
        
        this.app.use('/static',express.static("src/presentation/javascript"));

        
        
        sequelize.sync({force:true})


        SequelizeEvent.belongsTo(SequelizeField, { foreignKey: 'fieldsId', as: 'field' });
        SequelizeEvent.belongsTo(SequelizeProperty, { foreignKey: 'propertiesId', as: 'property' });

        const server = http.createServer(this.app)
        server.listen(this.port,async () => {
            console.log(`Server running on PORT ${this.port}`);
        })
        
        const ioServer = await io.connect(server)
        await RabbitMq.connection(ioServer)
        await RabbitMq.setQueue()
        await RabbitMq.consume()
    }
}