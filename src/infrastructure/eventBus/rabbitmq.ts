import {Connection,Channel, connect, ConsumeMessage} from "amqplib"
import {config,assertQueue,eventList} from './config'
import { EventDto } from "../../domain/dtos/events/event.dto";
import { Sequelize } from "sequelize";
import { SequelizeProperty } from "../database/models/Properties";
import { SequelizeField } from "../database/models/Fields";
import { SequelizeEvent } from "../database/models/Events";

export class RabbitMq{

    private static _connection: Connection;
    private static _channel: Channel;

    public static async connection() {
        let sconnection = await connect(config)
        this._connection = sconnection;
        this._channel = await this._connection.createConfirmChannel();
    }

    public static async setQueue(){
        await this._channel.assertQueue(
            'teaching-action.moodle_ju',
            assertQueue
        )
        await this._channel.assertExchange(
            "sagittarius-a",
            "fanout",
            {
                durable:true
            }
        )
        await this._channel.bindQueue(
            'teaching-action.moodle_ju',
            'sagittarius-a',
            'sagittarius-a'
        )
    }

    public static async consume() {
        await this._channel.consume(
            'teaching-action.moodle_ju',
            async (msg)=>{
                const [error,eventDto] = EventDto.create(msg!)
                await this.messageProcessor(eventDto!)
                console.log(eventDto);
            }
        )
    }

    public static async messageProcessor(msg: EventDto) {
        var createdProperty = await SequelizeProperty.create({
            contentType:msg.properties.contentType,
            contentEncoding:msg.properties.contentEncoding,
            headers:undefined,
            deliveryMode:msg.properties.deliveryMode,
            priority:msg.properties.priority,
            correlationId:msg.properties.correlationId,
            replyTo:msg.properties.replyTo,
            expiration:msg.properties.expiration,
            messageId:msg.properties.messageId,
            timestamp:msg.properties.timestamp,
            type:msg.properties.type,
            userId:msg.properties.userId,
            appId:msg.properties.appId,
            clusterId:msg.properties.clusterId,
        })

        var createdFields = await SequelizeField.create({
            consumerTag:msg.fields.consumerTag,
            deliveryTag:msg.fields.deliveryTag,
            redelivered:msg.fields.redelivered,
            exchange:msg.fields.exchange,
            routingKey:msg.fields.routingKey
        })

        var createEvent = await SequelizeEvent.create({
            fieldsId:createdFields.id,
            propertiesId:createdProperty.id,
            content:msg.content
        })
        //this._channel.ack(msg)
    }
}