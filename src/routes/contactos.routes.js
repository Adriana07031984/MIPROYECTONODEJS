import { Router } from "express";
import {
    actualizarFirmaContacto,
    consContacto,
    crearContacto,
    editarContacto,
    elimContacto,
    //validarConsContacto,
    //validarHabilitarTrabajador,
    //validarEditarTrabajador,
    //validarElimTrabajador,
  
} from "../controllers/contactos.controllers.js";
import { resultadoValidacion } from "../../helpers/validateHelper.js";
import {validarConsContacto } from "../../middlewares/validation/contactos.js";
import {validarEditarTrabajador} from "../../middlewares/validation/contactos.js";
    //validarHabilitarTrabajador,
  //validarEditarTrabajador,
  //validarElimTrabajador,
; 

const router = Router();


router.post(
    "/contacto",
     crearContacto);
router.get(
    "/contacto/consContacto/email/:email", 
    consContacto);
    
router.put(
    "/contacto/editarContacto", 
    actualizarFirmaContacto); 

    router.get(
        "/contacto/elimContacto/email/:email",
        elimContacto);


export default router;


