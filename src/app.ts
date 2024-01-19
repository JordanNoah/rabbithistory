import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
require('dotenv').config();


(()=>{
    main();
    console.log(process.env.RABBIT_USERNAME);
    
})()

async function main() {
    new Server({
        routes: AppRoutes.routes
    }).start()
}