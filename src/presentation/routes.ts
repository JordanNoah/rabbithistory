import { Router } from "express";
import path from "path";
import { SequelizeEvent } from "../infrastructure/database/models/Events";
import { SequelizeField } from "../infrastructure/database/models/Fields";
import { SequelizeProperty } from "../infrastructure/database/models/Properties";
import { Order, OrderItem, Sequelize } from "sequelize";

type CustomOrder = Array<[string | Record<string, 'ASC' | 'DESC'>, 'ASC' | 'DESC']>;


export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.get('/app/view',(req,res)=>{
            res.sendFile(path.join(__dirname,'./templates/index.html'))
        })
        router.post('/api/events', async (req,res) => {
            var body = req.body;
            const page = body.options.page
            const pageSize = body.options.itemsPerPage
            const offset = (page - 1) * pageSize           

            console.log(body.options);
    
            var sorting: OrderItem[];
            
            if(body.options.sortBy.length > 0){
                var typeSorting = body.options.sortBy[0].split(".")  
                if(typeSorting.length > 1){
                    sorting = [[typeSorting[0],typeSorting[1],body.options.sortDesc[0]?'ASC':'DESC']]
                }else{
                    sorting = [[body.options.sortBy[0],body.options.sortDesc[0]?'ASC':'DESC']];
                }
            }else{
                sorting = [];
            }

            var events = await SequelizeEvent.findAll({
                include:[
                    {
                        model:SequelizeField,
                        as:'field'
                    },
                    {
                        model:SequelizeProperty,
                        as:'property'
                    }
                ],
                offset:offset,
                limit:pageSize,
                order:sorting
            })
            var total = await SequelizeEvent.count()
            res.json(
                {
                    total:total,
                    events:events
                }
            )
        })
        return router;
    }
}