import express, { Router } from 'express'
import { RabbitMq } from '../infrastructure/eventBus/rabbitmq';
import { SequelizeEvent } from '../infrastructure/database/models/Events';
import { SequelizeField } from '../infrastructure/database/models/Fields';
import { SequelizeProperty } from '../infrastructure/database/models/Properties';

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
        
        await SequelizeField.sync({force:true})
        await SequelizeProperty.sync({force:true})
        await SequelizeEvent.sync({force:true})

        await RabbitMq.connection()
        await RabbitMq.setQueue()
        await RabbitMq.consume()

        this.app.listen(this.port,async () => {
            console.log(`Server running on PORT ${this.port}`);
        })    
    }
}