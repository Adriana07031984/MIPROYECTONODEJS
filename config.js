import {config} from 'dotenv';
config();

/*console.log(process.env.PORT);
console.log(process.env.DB_HOST)
console.log(process.env.DB_PORT)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_DATABASE)*/

//almacena el port, si no existe coloca el 4000
export const PORT = process.env.PORT || 4000

//PARA RAILWAY BD
//export const DB_USER = process.env.DB_USER || 'root'
//export const DB_PASSWORD = process.env.DB_PASSWORD || 'pass'
//export const DB_HOST = process.env.DB_HOST || 'hostname_dado_por_railway'
//export const DB_DATABASE = process.env.DB_DATABASE || 'railway'
//export const DB_PORT = process.env.DB_PORT || 5444


//PARA LOCAL
/*
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'sweetdream'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'companydb'
export const DB_PORT = process.env.DB_PORT || 5444
*/