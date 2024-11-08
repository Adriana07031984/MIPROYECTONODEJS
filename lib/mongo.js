import { MongoClient } from "mongodb";

const USER = "adrianarincon37";
const PASSWORD = "lv4dEftmpvwUroF0";
const DB_NAME_REMOTO = "ClusterMiniTic";
const DB_HOST_REMOTO = "clusterminitic.v5adl.mongodb.net";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EJEMPLO: 
//mongodb+srv://adrianarincon37:<db_password>@clusterminitic.v5adl.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMiniTic
//mongodb+srv://adrianarincon37:<db_password>@clusterminitic.v5adl.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMiniTic
//mongodb+srv://rampmail29:<db_password>@clusterwfs-mintic.ocxig.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWFS-MinTic
//endpoint      usuario   : pasword      host remoto de la base de datos     resto de código de la URL            Nombre de la BD 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST_REMOTO}/${DB_NAME_REMOTO}?retryWrites=true&w=majority&appName=ClusterMiniTic`;

export class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI);
    this.dbName = DB_NAME_REMOTO;
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
