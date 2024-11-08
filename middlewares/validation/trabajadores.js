import { check } from "express-validator";

//se validan los datos de las respuestas del formulario de evaluación induccReinducc
export const validarHabilitarTrabajador = [
  check("numeroDocumento")
    .notEmpty()
    .withMessage("No se recibió la clave número de documento!")
    .isNumeric()
    .withMessage("El número de documento debe ser numérico!")
    .escape(),
];

//se validan los datos al víncula el aplicante como trabajador
export const validarVincularAplicateComoTrabajador = [
  check("fechaExpedicionDocumento").notEmpty().withMessage("No se recibió clave Fecha de Expedición de Documento.").isISO8601().withMessage('Fecha de expedición de documento debe ser formato fecha!'),
  check("primerApellido").notEmpty().withMessage("No se recibió clave Primer Apellido.").escape(),
  check("segundoApellido").notEmpty().withMessage("No se recibió clave Segundo Apellido.").escape(),
  check("primerNombre").notEmpty().withMessage("No se recibió clave Primer Nombre.").escape(),
  check("segundoNombre").notEmpty().withMessage("No se recibió clave Segundo Nombre.").escape(),
  check("idEps").notEmpty().withMessage("No se recibió la clave idEps.").isNumeric().withMessage("Id EPS debe ser numérico.").escape(),
  check("idFondoPensiones").notEmpty().withMessage("No se recibió la clave idFondoPensiones.").isNumeric().withMessage("Id Fondo de Pensiones debe ser numérico.").escape(),
  check("idFondoCesantias").notEmpty().withMessage("No se recibió la clave idFondoCesantias.").isNumeric().withMessage("Id Fonde de Cesantías debe ser numérico.").escape(),
  check("idCajaCompensacionFamiliar").notEmpty().withMessage("No se recibió la clave idCajaCompensacionFamiliar.").isNumeric().withMessage("Id Caja de Compensación Familiar debe ser numérico.").escape(),
  check("direccion").notEmpty().withMessage("No se recibió clave Dirección.").escape(),
  check("barrio").notEmpty().withMessage("No se recibió clave Barrio.").escape(),
  check("celular").notEmpty().withMessage("No se recibió clave Celular.").escape(),
  check("ciudadResidencia").notEmpty().withMessage("No se recibió clave Ciudad de Residencia.").escape(),
  check("email").notEmpty().withMessage("No se recibió la clave Email").normalizeEmail().isEmail().withMessage('Email invalido'),
  check("estadoCivil").notEmpty().withMessage("No se recibió clave Estado Civil.").escape(),
  check("genero").notEmpty().withMessage("No se recibió clave Genero.").escape(),
  check("grupoSanguineo").notEmpty().withMessage("No se recibió clave Grupo Sanguíneo.").escape(),
  check("nivelEducativo").notEmpty().withMessage("No se recibió clave Nivel Educativo.").escape(),
  check("numeroLibretaMilitar").notEmpty().withMessage("No se recibió clave Número de Libreta Militar.").escape(),
  check("sede").notEmpty().withMessage("No se recibió clave Sede.").escape(),
  check("vehiculo").notEmpty().withMessage("No se recibió clave Vehículo.").escape(),
  check("ultimoCursoRealizado").notEmpty().withMessage("No se recibió último curso realizado.").escape(),
  check("tipoVivienda").notEmpty().withMessage("No se recibió clave Tipo de Vivienda.").escape(),
  check("lugarExpedicionDocumento").notEmpty().withMessage("No se recibió lugar de expedición de documento.").escape(),
  check("lugarNacimiento").notEmpty().withMessage("No se recibió clave Lugar de Nacimiento.").escape(),
  check("familiarMasCercano").notEmpty().withMessage("No se recibió clave Familiar Más Cercano.").escape(),
  check("aptitudesTecnologicas").notEmpty().withMessage("No se recibió clave Aptitudes Tecnológicas.").escape(),
  check("aspiracionSalariar").notEmpty().withMessage("No se recibió clave Aspiración Salarial.").escape(),
  check("ultimaEmpresaDondeTrabajo").escape(),
  check("fechaNacimiento").notEmpty().withMessage("No se recibió clave Fecha de Expedición de Nacimiento.").isISO8601().withMessage('Fecha de nacimiento debe ser formato fecha!'),
  check("expectativasComentario").escape(),
];

//validación de datos al editar trabajador
export const validarEditarTrabajador = [
  check("nombre").notEmpty().withMessage("No se recibió el  nombre").escape(),
  check("numeroDocumento").notEmpty().withMessage("No se recibió el  numero de Documento").escape(),
  check("tipoDocumento").notEmpty().withMessage("No se recibió clave tipoDocumento").escape(),
  check("fechaExpedicionDocumento").notEmpty().withMessage("No se recibió clave Fecha de Expedición de Documento.").isISO8601().withMessage('Fecha de expedición de documento debe ser formato fecha!'),
  check("email").notEmpty().withMessage("Debe digitar el email").normalizeEmail().isEmail().withMessage('Email invalido'),
  check("fechaRegistro").notEmpty().withMessage("No se recibió Fecha de Registro.").isISO8601().withMessage('Fecha de registro debe ser formato fecha!')
]


//validación de datos al editar trabajador
export const validarElimTrabajador = [
  check("nombre").notEmpty().withMessage("No se recibió el  nombre").escape(),
  check("numeroDocumento").notEmpty().withMessage("No se recibió el  numero de Documento").escape(),
  check("tipoDocumento").notEmpty().withMessage("No se recibió clave tipoDocumento").escape(),
  check("fechaExpedicionDocumento").notEmpty().withMessage("No se recibió clave Fecha de Expedición de Documento.").isISO8601().withMessage('Fecha de expedición de documento debe ser formato fecha!'),
  check("email").notEmpty().withMessage("Debe digitar el email").normalizeEmail().isEmail().withMessage('Email invalido'),
  check("fechaRegistro").notEmpty().withMessage("No se recibió Fecha de Registro.").isISO8601().withMessage('Fecha de registro debe ser formato fecha!')
]