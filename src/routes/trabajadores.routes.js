import { Router } from "express";
import {
  crearTrabajador,
  consTrabajador,
  vincularAplicanteComoTrabajador,
  editarTrabajador,
  consTrabajadores,
  habilitarEvaluReinduccion,
  generarExcelBaseDatosTrabajadores,
  consultarTrabajadorHabilitadoActualizacionDatos,
  actualizarFirmaTrabajador,
  elimTrabajador
} from "../controllers/trabajadores.controllers.js";
import { resultadoValidacion } from "../../helpers/validateHelper.js";
import {
  validarHabilitarTrabajador,
  validarEditarTrabajador,
  validarElimTrabajador,
} from "../../middlewares/validation/trabajadores.js";

const router = Router();

router.get("/trabajador/numeroDocumento/:numeroDocumento", consTrabajador);
router.post("/trabajador", crearTrabajador);
router.put("/trabajador/actualizarTrabajador", actualizarFirmaTrabajador);
router.post(
  "/trabajador/habilitarEvaluReinduccion",
  validarHabilitarTrabajador,
  resultadoValidacion,
  habilitarEvaluReinduccion
);
router.put(
  "/trabajador",
  /* validarEditarTrabajador, resultadoValidacion, */ 
  vincularAplicanteComoTrabajador
);
router.put(
  "/trabajador/editarTrabajador",
  validarEditarTrabajador,
  resultadoValidacion,
  editarTrabajador
);
router.get(
  "/trabajadores/limiteRegistros/:limiteRegistros/ordenadoPor/:ordenadoPor/condicionOrdenado/:condicionOrdenado",
  consTrabajadores
);
router.get(
  "/trabajadores/generarBaseDatosExcel",
  generarExcelBaseDatosTrabajadores
);
router.get(
  "/trabajadores/consultarDatosTrabajadorHabilitadoActualizacionDatos/numeroDocumento/:numeroDocumento/fechaExpedicionDocumento/:fechaExpedicionDocumento",
  consultarTrabajadorHabilitadoActualizacionDatos
);
router.get(
  "/trabajador/elimTrabajador/numeroDocumento/:numeroDocumento",
  elimTrabajador
);
router.get(
  "/trabajador/consTrabajador/numeroDocumento/:numeroDocumento",
  consTrabajador
  );

export default router;


