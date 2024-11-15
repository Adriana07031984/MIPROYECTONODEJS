import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
console.log(process.env.MONGO_URI);
console.log(process.env.DB_NAME_REMOTO);

const MONGO_OPTIONS = {
  tls: true,
  serverSelectionTimeoutMS: 4000,
  autoSelectFamily: false,
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EJEMPLO: 
//mongodb+srv://adrianarincon37:<db_password>@clusterminitic.v5adl.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMiniTic
//mongodb+srv://adrianarincon37:<db_password>@clusterminitic.v5adl.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMiniTic
//mongodb+srv://rampmail29:<db_password>@clusterwfs-mintic.ocxig.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWFS-MinTic
//endpoint      usuario   : pasword      host remoto de la base de datos     resto de código de la URL            Nombre de la BD 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, MONGO_OPTIONS);
    console.log(process.env.MONGO_URI);
    this.dbName = process.env.DB_NAME_REMOTO;
    console.log(process.env.DB_NAME_REMOTO);
    this.connection = null;
  }

  async connect() {
    try {
      if (!this.connection) {
        console.log("Conectando a la BBDD...");
        this.connection = await this.client.connect();
        console.log("Conectado a la BBDD");
      }
      return this.connection.db(this.dbName);
    } catch (error) {
      console.error("Error en la conexión con la BBDD:", error);
      throw new Error("No se pudo conectar a la base de datos");
    }
  }

  async close() {
    if (this.client) {
      await this.client.close();
      console.log("Conexión cerrada");
    }
  }
}
