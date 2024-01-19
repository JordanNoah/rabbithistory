import { Model, DataTypes } from "sequelize"
import { sequelize } from "../sequelize"

interface PropertyRow {
    id: number,
    contentType?: string,
    contentEncoding?: string | null,
    headers?: string | null,
    deliveryMode?: number | null,
    priority?: number | null,
    correlationId?: number | null,
    replyTo?: string | null,
    expiration?: string | null,
    messageId?: string | null,
    timestamp?: string | null,
    type?: string | null,
    userId?: string | null,
    appId?: string | null,
    clusterId?: string | null,
    createdAt?: Date,
    updatedAt?: Date
}

export class SequelizeProperty extends Model<PropertyRow,Omit<PropertyRow,'id'>>{
    declare id: number
    declare contentType: string
    declare contentEncoding: string | null
    declare headers: string | null
    declare deliveryMode: number | null
    declare priority: number | null
    declare correlationId: number | null
    declare replyTo: string | null
    declare expiration: string | null
    declare messageId: string | null
    declare timestamp: string | null
    declare type: string | null
    declare userId: string | null
    declare appId: string | null
    declare clusterId: string | null
    declare readonly createdAt?: Date
    declare readonly updatedAt?: Date
}

SequelizeProperty.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    contentType:{
        type: DataTypes.STRING,
        allowNull: true
    },
    contentEncoding:{
        type: DataTypes.STRING,
        allowNull: true
    },
    headers:{
        type: DataTypes.STRING,
        allowNull: true
    },
    deliveryMode:{
        type: DataTypes.STRING,
        allowNull: true
    },
    priority:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    correlationId:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    replyTo:{
        type: DataTypes.STRING,
        allowNull: true
    },
    expiration:{
        type: DataTypes.STRING,
        allowNull: true
    },
    messageId:{
        type: DataTypes.STRING,
        allowNull: true
    },
    timestamp:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: true
    },
    userId:{
        type: DataTypes.STRING,
        allowNull: true
    },
    appId:{
        type: DataTypes.STRING,
        allowNull: true
    },
    clusterId:{
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    sequelize,
    timestamps: true,
    tableName: 'property'
})