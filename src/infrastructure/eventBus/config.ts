import {ServerProperties, Options} from "amqplib";
import { Processor } from "./processor";
import AppConfig from "../../domain/config";

export const config:Options.Connect = {
    username:AppConfig.RABBIT_USERNAME,
    password:AppConfig.RABBIT_PASSWORD,
    protocol:AppConfig.RABBIT_PROTOCOL,
    hostname:AppConfig.RABBIT_HOSTNAME,
    port:5672,
    vhost:AppConfig.RABBIT_VHOST
}

export const assertQueue: Options.AssertQueue = {
    exclusive:false
}


export const eventList: Map<string, (payload:any) => Promise<void>> = new Map([])