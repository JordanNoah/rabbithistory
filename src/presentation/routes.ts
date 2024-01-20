import { Router } from "express";
import path from "path";
import { SequelizeEvent } from "../infrastructure/database/models/Events";
import { SequelizeField } from "../infrastructure/database/models/Fields";
import { SequelizeProperty } from "../infrastructure/database/models/Properties";
import { Order } from "sequelize";

type CustomOrder = Array<[string | Record<string, 'ASC' | 'DESC'>, 'ASC' | 'DESC']>;


export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.get('/app/view',(req,res)=>{
            res.sendFile(path.join(__dirname,'./templates/index.html'))
        })
        router.post('/api/events', async (req,res) => {
            var body = req.body;
console.log(body);

            const page = body.options.page
            const pageSize = body.options.itemsPerPage
            const offset = (page - 1) * pageSize

            const sorting: [Record<string, 'ASC' | 'DESC'>, 'ASC' | 'DESC'][] = body.options.sortBy.map(
                (sortBy: string, index: number) => {
                  const sortParts = sortBy.split('.');
              
                  const order: Record<string, 'ASC' | 'DESC'> = sortParts.reduce(
                    (acc, prop, i) => {
                      if (i === sortParts.length - 1) {
                        acc[prop] = body.options.sortDesc[index] ? 'DESC' : 'ASC';
                      } else {
                        acc[prop] = acc[prop] || {} as unknown as Record<string, 'ASC' | 'DESC'>;
                        acc = acc[prop] as unknown as Record<string, 'ASC' | 'DESC'>;
                      }
                      return acc;
                    },
                    {} as Record<string, 'ASC' | 'DESC'>
                  );
              
                  return [order, body.options.sortDesc[index] ? 'DESC' : 'ASC'];
                }
              );
            
              function convertToSequelizeOrder(sorting: CustomOrder): Order {
                return sorting.map(([order, direction]) => [order, direction]) as Order;
              }
              console.log(convertToSequelizeOrder(sorting));
              

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
                order:convertToSequelizeOrder(sorting)
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