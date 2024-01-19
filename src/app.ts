import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
require('dotenv').config();


(()=>{
    main();
})()

async function main() {
    new Server({
        routes: AppRoutes.routes
    }).start()
}