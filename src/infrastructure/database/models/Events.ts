import { Model, DataTypes } from "sequelize"
import { sequelize } from "../sequelize"
import { SequelizeField } from "./Fields"
import { SequelizeProperty } from "./Properties"

interface EventRow {
    id: number,
    fieldsId?: number,
    propertiesId?: number,
    content?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class SequelizeEvent extends Model<EventRow,Omit<EventRow,'id'>>{
    declare id: number
    declare fieldsId: number | null
    declare propertiesId: number | null
    declare content: string | null
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

SequelizeEvent.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fieldsId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: SequelizeField,
            key: 'id'
        }
    },
    propertiesId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: SequelizeProperty,
            key: 'id'
        }
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:true
    }
},{
    sequelize,
    timestamps: true,
    tableName:'event'
})