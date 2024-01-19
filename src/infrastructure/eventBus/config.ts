import {ServerProperties, Options} from "amqplib";
import { Processor } from "./processor";
import AppConfig from "../../domain/config";

export const config:Options.Connect = {
    username:AppConfig.RABBIT_USERNAME,
    password:AppConfig.RABBIT_PASSWORD,
    protocol:'amqp',
    hostname:'34.135.166.250',
    port:5672,
    vhost:'beta'
}

export const assertQueue: Options.AssertQueue = {
    exclusive:false
}


export const eventList: Map<string, (payload:any) => Promise<void>> = new Map([])