import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

interface FieldRow {
    id: number,
    consumerTag?: string,
    deliveryTag?: number,
    redelivered?: Boolean,
    exchange?: string,
    routingKey?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class SequelizeField extends Model<FieldRow,Omit<FieldRow,'id'>>{
    declare id: number
    declare consumerTag: string | null
    declare deliveryTag: number | null
    declare redelivered: Boolean
    declare exchange: string | null
    declare routingKey: string | null
    declare readonly createdAt?: Date
    declare readonly updatedAt?: Date
}

SequelizeField.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    consumerTag:{
        type: DataTypes.STRING,
        allowNull: true
    },
    deliveryTag:{
        type: DataTypes.STRING,
        allowNull: true
    },
    redelivered:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    exchange:{
        type: DataTypes.STRING,
        allowNull: true
    },
    routingKey:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    sequelize,
    timestamps: true,
    tableName: 'field'
})