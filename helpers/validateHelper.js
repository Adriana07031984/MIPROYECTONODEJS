import { validationResult } from "express-validator";
import { formatoRta } from "../src/scripts/formatoRta.js";

//se encarga de dar un resultado después de aplicar todas las validaciones y si consigue un error, arroja el error o si no da continuidad
export function resultadoValidacion(req, res, next){
    const result = validationResult(req).array();
    if(!result.length) return next();
    console.log(result);
    const error = result [0].msg;
   // res.status(400).json({code: 400, message: error});
    res
    .status(400)
    .json(
      formatoRta(
        "400",
        "",
        error
      )
    );
}