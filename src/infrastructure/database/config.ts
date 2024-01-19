import { Options } from "sequelize";
import AppConfig from "../../domain/config";

export const config: Options = {
    host:AppConfig.DB_HOST,
    username:AppConfig.DB_USERNAME,
    password:AppConfig.DB_PASSWORD,
    logging: (...msg) => false,
    port:parseInt(AppConfig.DB_PORT),
    database:AppConfig.DB_NAME,//database name
    dialect:'mysql'
}