import express, { Router } from 'express'
import { RabbitMq } from '../infrastructure/eventBus/rabbitmq';
import { SequelizeEvent } from '../infrastructure/database/models/Events';
import { SequelizeField } from '../infrastructure/database/models/Fields';
import { SequelizeProperty } from '../infrastructure/database/models/Properties';
import { sequelize } from '../infrastructure/database/sequelize';
import path from 'path';

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
        
        //sequelize.sync({force:true})


        SequelizeEvent.belongsTo(SequelizeField, { foreignKey: 'fieldsId', as: 'field' });
        SequelizeEvent.belongsTo(SequelizeProperty, { foreignKey: 'propertiesId', as: 'property' });

        await RabbitMq.connection()
        await RabbitMq.setQueue()
        //await RabbitMq.consume()

        this.app.listen(this.port,async () => {
            console.log(`Server running on PORT ${this.port}`);
        })    
    }
}