import { formatoRta } from "../scripts/formatoRta.js";
import { obtenerFechaYHoraActual } from "../scripts/fechaHoraActual.js";
import fs from "fs";
import util from "util";
import dayjs from "dayjs";
import "dayjs/locale/es.js";
import { MongoLib } from "../../lib/mongo.js";
const readFile = util.promisify(fs.readFile);
const unlinkFile = util.promisify(fs.unlink);

////////////////////////////////
export const crearContacto = async (req, res) => {
  const {
    nombres,
    apellidos,
    fechaNacimiento,
    sexo,
    telefono,
    email,
    password,
  } = req.body;
  console.log("🚀 ~ crearContacto ~ email:", email);
  obtenerFechaYHoraActual();
  const db = new MongoLib();

  try {
    // Conectarse a la base de datos
    const database = await db.connect();
    const collection = database.collection("contactos");

    // Revisar si el contacto ya existe
    const contactoExistente = await collection.findOne({ email });

    if (contactoExistente) {
      return res
        .status(400)
        .json(
          formatoRta(
            "",
            "",
            `El contacto con email ${email} ya está registrado.`
          )
        );
    }

    // Crear el nuevo contacto
    const nuevoContacto = {
      nombres,
      apellidos,
      fechaNacimiento,
      sexo,
      telefono,
      email,
      password,
    };

    const resultado = await collection.insertOne(nuevoContacto);

    if (resultado.insertedId) {
      res
        .status(201)
        .json(
          formatoRta(
            resultado.insertedId,
            "",
            "Contacto registrado exitosamente"
          )
        );
    } else {
      res
        .status(500)
        .json(
          formatoRta(
            "",
            "",
            "Error al registrar el contacto en la base de datos"
          )
        );
    }
  } catch (error) {
    console.error("Error en crearContacto:", error);
    res
      .status(500)
      .json(
        formatoRta(
          "",
          "",
          "Ocurrió un error en el servidor. Por favor, inténtelo de nuevo."
        )
      );
  } finally {
    await db.close();
  }
};


//Consultar Contacto***************************************************************************
export const consContacto = async (req, res) => {
    console.log("consContacto, req.params =>", req.params);
    obtenerFechaYHoraActual();
  
    const { email } = req.params;
    if (!email) {
        return res.status(400).json(formatoRta("", "", "Email no proporcionado"));
    }
    const db = new MongoLib();
  
    try {
      // Conectarse a la base de datos
      const database = await db.connect();
      const collection = database.collection("contactos");
  
      // Buscar el contacto por email
      const contacto = await collection.findOne({ email });
  
      if (contacto) {
        console.log("Contacto encontrado:", contacto);
        res.status(200).json(contacto);
      } else {
        console.log("No se encontró el contacto");
        res.status(404).json(formatoRta("", "", "Contacto no encontrado"));
      }
    } catch (error) {
      console.error("Error en consContacto:", error);
      res
        .status(500)
        .json(
          formatoRta(
            error.code,
            "",
            "Ocurrió un error en el servidor. Por favor, inténtelo de nuevo."
          )
        );
    } finally {
      await db.close();
    }
  };
  

  export const vincularAplicanteComoContacto= async (req, res) => {
    //return console.log("entrando a controlador vincularApliacnteComoContacto");
    try {
      //console.log("datos recibidos", req.body)
      const {
      nombres,
      apellidos,
      fechaNacimiento,
      sexo,
      telefono,
      email,
      password,
      } = req.body;
  
      console.log(referenciasPersonal1);
  
      if (email === "") {
        res
          .status(500)
          .json(
            formatoRta(
              "",
              "",
              "No se recibió el email en el servidor"
            )
          );
        return;
      }
      if (nombres === "") {
        res
          .status(500)
          .json(
            formatoRta("", "", "No se recibió los nombres en el servidor")
          );
        return;
      }
      if (apellidos === "") {
        res
          .status(500)
          .json(
            formatoRta("", "", "No se recibió los apellidos en el servidor")
          );
        return;
      }

    
    if (fechaNacimiento === "") {
      res
        .status(500)
        .json(
          formatoRta("", "", "No se recibió fecha nacimiento en el servidor")
        );
      return;
    }

    if (sexo === "") {
        res
          .status(500)
          .json(
            formatoRta("", "", "No se recibió sexo en el servidor")
          );
        return;
      }

      if (telefono === "") {
        res
          .status(500)
          .json(
            formatoRta("", "", "No se recibió telefono en el servidor")
          );
        return;
      }

      if (password === "") {
        res
          .status(500)
          .json(
            formatoRta("", "", "No se recibió password en el servidor")
          );
        return;
      }
  
      let sql1 = `UPDATE contactos SET email = ?,
          nombres = ?,
          apellidos =?,
          fechaNacimiento =?,
          sexo =?,
          telefono =?,
          password =?;`;
      let datos = [nombres, apellidos, fechaNacimiento, sexo, telefono, password];
  
      const [rta1] = await pool.query(sql1, datos);
  
      if (rta1.changedRows == 1) {
        res.status(200).json({ message: "contacto editado con exito" });
      } else {
        res.status(204).json();
      }
    } catch (e) {
      res.status(500).json(formatoRta(e.code, "", e.message));
      console.log("error", e.code, e.message);
    }
  };
  
  export const consContactos = async (req, res) => {
    const { limiteRegistros, ordenadoPor, condicionOrdenado } = req.params;
    console.log("params", req.params);
  
    try {
      const sqlConsContactos =
        "SELECT * FROM contactos ORDER BY " +
        ordenadoPor +
        " " +
        condicionOrdenado +
        " LIMIT " +
        limiteRegistros +
        "";
      const rtaContactos = await pool.query(sqlConsTrabajadores, []);
  
      if (rtaContactos.length > 0) {
        //formateo las fechas
        const contactosFormateados = rtaContactos[0].map((contacto) => {
        
      
  
          //formateo fechaNacimiento
          const fechaNacimientoFormateada = contacto.fechaNacimiento
            .toISOString()
            .split("T")[0];
  
          return {
            ...contacto,

            fechaNacimiento: fechaNacimientoFormateada,
          };
        });
        res.status(200).json(contactosFormateados);
      } else {
        res.status(204).json();
      }
    } catch (e) {
      res
        .status(500)
        .json(
          formatoRta(
            e.code,
            "",
            "Favor avisar a sistemas, código error: " +
              e.code +
              ", mensaje del servidor " +
              e.message
          )
        );
    }
  };
  
  export const habilitarEvaluReinduccion = async (req, res) => {
    const { email } = req.body;
    console.log(
      "se habilitará para que presente la evaluación de reinduccion al contacto email " +
        email
    );
    /* try {
      const [rtaTrabajador] = await pool.query(sqlTrabajdor, [numeroDocumento]);
      //console.log(rtaTrabajador)
      if (rtaTrabajador.length > 0) {
        //actualizar la fecha de habilitacion en la tabla trabajadores
        try {
          let emailDestinatario = rtaTrabajador[0].email;
  
          let cuerpoHtml = ``;
  
          const [insertHabilitado] = await pool.query(sqlInsertHabilitado, [
            numeroDocumento,
          ]);
  
          if (insertHabilitado.affectedRows === 1) {
            //
            try {
              let info = await sistemasTransporter.sendMail({
                from: "CORREO DE ORIGEN<correo@correo.com>", // sender address
                to: email, // list of receivers
                subject:
                  "Se le ha habilitado el acceso para continuar en el proceso", // Subject line
                //text: "Nuevo concepto generado?", // plain text body
                html: cuerpoHtml, // html body
              });
  
              //console.log(info)
  
              if (info.response == "250 Message received") {
                res.status(200).json();
              }
            } catch (e) {
              //console.log("e", e)
              res.status(500).json(formatoRta(e.code, "", "" + e.response));
            }
          }
        } catch (e) {
          //aca mire como se maneja el error del entry key duplicado
          console.log("e", e.sqlMessage);
          return res.status(400).json(formatoRta(e.errno, "", e.sqlMessage));
        }
      }
    } catch (e) {
      res
        .status(500)
        .json(
          formatoRta(
            e.code,
            "",
            "Favor avisar a sistemas, código error: " +
              e.code +
              ", mensaje del servidor " +
              e.message
          )
        );
    } */
  };
  
  export const generarExcelBaseDatosTrabajadores = async (req, res) => {
    let wb, datos;
  
    try {
      let sql = `WITH ContratosRecientes AS ( SELECT numeroDocumento, MAX(id) AS ultimoContratoId FROM contratos GROUP BY numeroDocumento)
          SELECT 
              t.id,
              t.tipoDocumento,
              t.numeroDocumento,
              t.fechaExpedicionDocumento,
              t.primerApellido,
              t.segundoApellido,
              t.primerNombre,
              t.segundoNombre,
              t.nombreCompleto,
              t.idEps,
              t.idFondoPensiones,
              t.idFondoCesantias,
              t.idCajaCompensacionFamiliar,
              t.cargo,
              t.direccion,
              t.barrio,
              t.celular,
              t.ciudadResidencia,
              t.email,
              t.estadoCivil,
              t.genero,
              t.grupoSanguineo,
              t.nivelEducativo,
              t.numeroLibretaMilitar,
              t.sede,
              t.vehiculo,
              t.ultimoCursoRealizado,
              t.tipoVivienda,
              t.lugarExpedicionDocumento,
              t.lugarNacimiento,
              t.expectativasComentario,
              t.anosExperienciaLaboral,
              t.referenciasPersonal1,
              t.referenciasPersonal2,
              t.aspiracionSalarial,
              t.ultimaEmpresaDondeTrabajo,
              t.familiarMasCercano,
              t.aptitudesTecnologicas,
              t.fechaNacimiento,
              c.id AS idUltimoContrato,
              c.estado AS estadoUltimoContrato,
              c.fechaInicio AS fechaInicioUltimoContrato,
              c.puesto AS puestoUltimoContrato,
              c.cliente AS clienteUltimoContrato
          FROM 
              trabajadores t
          LEFT JOIN 
              ContratosRecientes cr ON t.numeroDocumento = cr.numeroDocumento
          LEFT JOIN 
              contratos c ON cr.ultimoContratoId = c.id;`;
  
      const [filas] = await pool.query(sql, []);
      console.log(filas);
  
      if (filas.length > 0) {
        // Crea un libro de trabajo
        wb = utils.book_new();
  
        datos = [
          [
            "TIPO DOC",
            "NUMERO DOC",
            "FECHA EXP DOC",
            "SEDE",
            "CARGO",
            "PRIMER APELLIDO",
            "SEGUNDO APELLIDO",
            "PRIMER NOMBRE",
            "SEGUNDO NOMBRE",
            "FECHA NACIMIENTO",
            "GENERO",
            "CELULAR",
            "DIRECCION",
            "BARRIO",
            "CIUDAD RESIDENCIA",
            "EMAIL",
            "GRUPO SANGUINEO",
            "NIVEL EDUCATIVO",
            "FAMILIAR MAS CERCANO",
            "VEHICULO",
            "VIVIENDA",
            "ESTADO ULTIMO CONTRATO",
            "FECHA INICIO ULTIMO CONTRATO",
            "ID ULTIMO CONTRATO",
            "PUESTO",
            "CLIENTE",
          ],
        ];
  
        filas.forEach((t) => {
          datos.push([
            t.tipoDocumento,
            t.numeroDocumento,
            t.fechaExpedicionDocumento,
            t.sede,
            t.cargo,
            t.primerApellido,
            t.segundoApellido,
            t.primerNombre,
            t.segundoNombre,
            t.fechaNacimiento,
            t.genero,
            t.celular,
            t.direccion,
            t.barrio,
            t.ciudadResidencia,
            t.email,
            t.grupoSanguineo,
            t.nivelEducativo,
            t.familiarMasCercano,
            t.vehiculo,
            t.tipoVivienda,
            t.estadoUltimoContrato,
            t.fechaInicioUltimoContrato,
            t.idUltimoContrato,
            t.puestoUltimoContrato,
            t.clienteUltimoContrato,
          ]);
        });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send(formatoRta("", "", error.sqlMessage));
    }
  
    //excel construido, se envia entonces
    try {
      // Convierte los datos a una hoja de trabajo
      const ws = utils.aoa_to_sheet(datos);
  
      // Añade la hoja de trabajo al libro con el nombre "Datos"
      utils.book_append_sheet(wb, ws, "Datos");
  
      // Escribe el libro de trabajo a un archivo
      let nombreExcel = "baseDatos.xlsx";
      writeFile(wb, nombreExcel);
  
      console.log("¡Excel generado con éxito!");
      // Leer el archivo
      const excelContent = await readFile(nombreExcel);
      // Enviar el archivo como respuesta
      res.contentType(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.send(excelContent);
  
      //Eliminar el archivo del servidor después de enviarlo
      await unlinkFile(nombreExcel);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send(formatoRta("", "", "Error al enviar el archivo."));
    }
  };
  
  export const consultarTrabajadorHabilitadoActualizacionDatos = async (
    req,
    res
  ) => {
    const { numeroDocumento, fechaExpedicionDocumento } = req.params;
  
    //console.log('req.params recibidos', req.params)
    if (numeroDocumento == "") {
      res
        .status(500)
        .json(formatoRta("", "", "No se recibio el numero de documento"));
      return;
    }
    if (fechaExpedicionDocumento == "") {
      res
        .status(500)
        .json(formatoRta("", "", "No se recibio el numero de documento"));
      return;
    }
  
    const arrRta = await consRegistrosPor1CampoOrderByLimit(
      "habilitadosActualizacionDatos",
      "numeroDocumento",
      numeroDocumento,
      "id",
      "desc",
      1
    );
  
    if (arrRta.length === 1) {
      try {
        const sql1 = "SELECT * FROM trabajadores WHERE numeroDocumento = ?";
        const [rtaMySql] = await pool.query(sql1, [numeroDocumento]);
        if (rtaMySql.length === 1) {
          let datosTrabajador = rtaMySql[0];
          console.log(
            "datosTrabajador antes de validar si concuerda con la fechaExpedicionDocumento",
            datosTrabajador
          );
  
          if (
            fechaExpedicionDocumento ===
            dayjs(datosTrabajador.fechaExpedicionDocumento).format("YYYY-MM-DD")
          ) {
            console.log(
              `fecha exp documento recibida ${fechaExpedicionDocumento} si concuerda con la actual del trabajador ${datosTrabajador.fechaExpedicionDocumento}`
            );
            res.status(200).json(rtaMySql[0]);
          } else {
            res
              .status(403)
              .json(
                formatoRta(
                  "",
                  "",
                  "Trabajador esta autorizado para actualizar los datos pero la fecha de expedición no pertenece al numero de documento digitado"
                )
              );
          }
        } else {
          res.status(404).json(formatoRta("", "", "Trabajador no existe"));
        }
      } catch (e) {
        res
          .status(500)
          .json(
            formatoRta(
              e.code,
              "",
              "Favor avisar a sistemas, código error: " +
                e.code +
                ", mensaje del servidor " +
                e.message
            )
          );
      }
    } else {
      res
        .status(403)
        .json(
          formatoRta(
            "",
            "",
            "No está habilitado para realizar actualización de datos"
          )
        );
    }
  };
  

  export const actualizarFirmaContacto = async (req, res) => {
    console.log(req.body);
    const {
      nombres,
      apellidos,
      fechaNacimiento,
      sexo,
      telefono,
      email,
    } = req.body;
    console.log("*************************************************");
    res.status(200).json();
  };
  export const actualizarFirmaTrabajador = async (req, res) => {
    console.log(req.body);
    const {
      nombres,
      apellidos,
      fechaNacimiento,
      sexo,
      telefono,
      email,
    } = req.body;
    console.log("*************************************************");
    res.status(200).json();
    try {
      if (numeroDocumento == "" || numeroDocumento == null) {
        res
          .status(500)
          .json(formatoRta("", "", "No se recibio el numero de documento"));
        return;
      }
      if (firmaBase64 == "" || firmaBase64 == null) {
        res
          .status(500)
          .json(formatoRta("", "", "No se recibio la firma en base64"));
        return;
      }
      if (firmaAlto == "" || firmaAlto == null) {
        res
          .status(500)
          .json(formatoRta("", "", "No se recibio el alto de la firma"));
        return;
      }
      if (firmaAncho == "" || firmaAncho == null) {
        res
          .status(500)
          .json(formatoRta("", "", "No se recibio el ancho de la firma"));
        return;
      }
  
      let datos = [firmaBase64, firmaAlto, firmaAncho, numeroDocumento];
      console.log("datos", datos);
      const [rta1] = await pool.query(sqlEditarFirmaBase64Trabajador, datos);
      console.log(rta1);
      if (rta1.changedRows === 1) {
        res.status(200).json(formatoRta("", "", ``));
      } else {
        res.status(204).json();
      }
    } catch (e) {
      //por ejemplo, e.code = "ER_DUP_ENTRY" es que la llave primaria ya existe.
      console.log("error =>", e);
      res
        .status(500)
        .json(
          formatoRta(
            e.code,
            "",
            "Favor avisar a sistemas, código error: " +
              e.code +
              ", mensaje del servidor " +
              e.sqlMessage
          )
        );
  } };
  
 // editar contacto ****************************
 export const editarContacto= async (req, res) => {
    console.log("editarContacto, req.body =>", req.body);
    const {
        nombres,
        apellidos,
        fechaNacimiento,
        sexo,
        telefono,
        email,
        password,
    } = req.body;
    obtenerFechaYHoraActual();
  
    const db = new MongoLib();
  
    try {
      // Conectar a la base de datos
      const database = await db.connect();
      const collection = database.collection("contactos");
      const result = await collection.updateOne(
        { numeroDocumento }, //---> para validar el registro que se va a actualizar
        {
          $set: {
            nombres,
            apellidos,
            fechaNacimiento,
            sexo,
            telefono,
            password,
          },
        }
      );
      console.log("🚀 ~ editarContacto ~ result:", result);
  
      if (result.matchedCount === 1) {
        console.log("Contacto actualizado:", email);
        res
          .status(200)
          .json(
            formatoRta(
              "",
              "",
              `Contacto con email ${email} actualizado con éxito`
            )
          );
      } else {
        console.log("Contacto no encontrado para actualizar");
        res.status(404).json(formatoRta("", "", "Contacto no encontrado"));
      }
    } catch (error) {
      console.error("Error en editTrabajador:", error);
      res
        .status(500)
        .json(
          formatoRta(
            error.code,
            "",
            "Ocurrió un error en el servidor. Por favor, inténtelo de nuevo."
          )
        );
    } finally {
      await db.close();
    }
  };
   
/// eliminar contacto
  export const elimContacto = async (req, res) => {
    console.log("elimContacto, req.params =>", req.params);
    obtenerFechaYHoraActual();
  
    const { email } = req.params;
    if (!email) {
      return res
        .status(400)
        .json(formatoRta("", "", "No se recibió el email"));
    }
  
    const db = new MongoLib();
  
    try {
      // Conectarse a la base de datos
      const database = await db.connect();
      const collection = database.collection("contactos");
  
      // Intentar eliminar el trabajador por número de documento
      const result = await collection.deleteOne({ email });
  
      if (result.deletedCount === 1) {
        console.log("Contacto eliminado:", email);
        res
          .status(200)
          .json(
            formatoRta(
              "",
              "",
              `Contacto con email ${email} eliminado exitosamente`
            )
          );
      } else {
        console.log("Contacto no encontrado para eliminación");
        res.status(404).json(formatoRta("", "", "Contacto no encontrado"));
      }
    } catch (error) {
      console.error("Error en elimContacto:", error);
      res
        .status(500)
        .json(
          formatoRta(
            error.code,
            "",
            "Ocurrió un error en el servidor. Por favor, inténtelo de nuevo."
          )
        );
    } finally {
      await db.close();
    }
  };