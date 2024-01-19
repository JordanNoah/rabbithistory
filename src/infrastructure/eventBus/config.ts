import {ServerProperties, Options} from "amqplib";
import { Processor } from "./processor";

export const config:Options.Connect = {
    username:'accion-docente-beta',
    password:'LTKMjxKbMPB0',
    protocol:'amqp',
    hostname:'34.135.166.250',
    port:5672,
    vhost:'beta'
}

export const assertQueue: Options.AssertQueue = {
    exclusive:false
}


export const eventList: Map<string, (payload:any) => Promise<void>> = new Map([])