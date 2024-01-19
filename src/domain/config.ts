require('dotenv').config()

export default {
    RABBIT_USERNAME:process.env.RABBIT_USERNAME || '',
    RABBIT_PASSWORD:process.env.RABBIT_PASSWORD || '',
    RABBIT_PROTOCOL:process.env.RABBIT_PROTOCOL || '',
    RABBIT_HOSTNAME:process.env.RABBIT_HOSTNAME || '',
    RABBIT_PORT:process.env.RABBIT_PORT || '',
    RABBIT_VHOST:process.env.RABBIT_VHOST || '',
    RABBIT_QUEUE:process.env.RABBIT_QUEUE || '',
    RABBIT_EXCHANGE: process.env.RABBIT_EXCHANGE || '',
    RABBIT_ROUTING_KEY: process.env.RABBIT_ROUTING_KEY || '',
    RABBIT_TYPE_EXCHANGE: process.env.RABBIT_TYPE_EXCHANGE || '',
    DB_HOST:process.env.DB_HOST || '',
    DB_USERNAME:process.env.DB_USERNAME || '',
    DB_PASSWORD:process.env.DB_PASSWORD || '',
    DB_PORT:process.env.DB_PORT || '',
    DB_NAME:process.env.DB_NAME || ''
}