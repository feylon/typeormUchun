import "reflect-metadata"
import { DataSource } from "typeorm";
import { User } from "../db/entities/user";

export const AppDataSource = new DataSource({
type : "postgres",
host : "localhost",
port : 5432,
username : "postgres",
password : "123456",
database : "nuxt",
synchronize : true,
dropSchema : true,
entities : [User]
});



export default defineNitroPlugin(async ()=>{
    try {
        console.log("Plugin ishga tushdi ...");
        if (!AppDataSource.isInitialized) {
    console.log("TypeORM ulanmoqda...");
    await AppDataSource.initialize();
  }
    } catch (error) {
        console.log("Error mavjud")
    }
})