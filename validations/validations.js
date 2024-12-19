import { body, query, header, param } from "express-validator";

const validationNameOrSurname = (name) => {
  return body(name)
    .isString()
    .withMessage("Completa el campo.")
    .isLength({ min: 1, max: 100 })
    .withMessage("el ${name} debe tener entre 1 y 100 caracteres.");
};

const validationPrice = () => {
  return body("precio")
    .isNumeric()
    .withMessage("Completa el campo.")
    .isLength({ min: 1, max: 100000 })
    .withMessage("el nombre debe tener entre 1 y 100000.");
};

const validationStock = () => {
  return body("stock")
    .isNumeric()
    .withMessage("Completa el campo.")
    .isLength({ min: 1, max: 100000 })
    .withMessage("el nombre debe tener entre 1 y 100000.");
};

const validationState = () => {
  return body("estado").isBoolean().withMessage("Completa el campo.");
};

const validationBirthDate = () => {
  return body("fechaNacimiento")
    .custom((value) => {
      const inputDate = new Date(value);
      const currentDate = new Date();
      const isFutureDate = inputDate.getTime() >= currentDate.getTime();
      if (isFutureDate) {
        return false;
      }
      return true; // Si pasa la validación, devolver true.
    })
    .withMessage("Completa el campo con una fecha válida.");
};
const validationUsernameOrEmail = () => {
  return body("username").custom((value) => {
    // Verificar si es un correo válido
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    // Verificar si es un nombre de usuario válido
    const isUsername =
      typeof value === "string" && value.length >= 1 && value.length <= 100;

    if (!isEmail && !isUsername) {
      throw new Error(
        "Debe ser un correo electrónico válido o un nombre de usuario entre 1 y 100 caracteres."
      );
    }

    return true; // Pasa la validación
  });
};

const validationEmail = () => {
  return body("email")
    .isEmail()
    .withMessage("Completa el campo con un correo valido.");
};

const validationPassword = () => {
  return body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres.");
};

const validationParamID = () => {
  return param("id")
    .isUUID()
    .withMessage("Completa el campo con un id valido.");
};

const validationQueryPage = () => {
  return query("page")
    .optional()
    .isNumeric()
    .withMessage("Completa el campo con un numero valido.");
};
const validationQueryLimit = () => {
  return query("limit")
    .optional()
    .isNumeric()
    .withMessage("Completa el campo con un numero valido.");
};
const validationQueryNombre = () => {
  return query("nombre")
    .optional()
    .isString()
    .withMessage("Completa el campo con un string valido.");
};
const validationQueryPrecioMin = () => {
  return query("precioMin")
    .optional()
    .isNumeric()
    .withMessage("Completa el campo con un numero valido.");
};
const validationQueryPrecioMax = () => {
  return query("precioMax")
    .optional()
    .isNumeric()
    .withMessage("Completa el campo con un numero valido.");
};

const validationQueryOrderBy = () => {
  return query("orderBy")
    .optional()
    .isString()
    .withMessage("Completa el campo con un string valido.");
};

const validationQueryOrder = () => {
  return query("order")
    .optional()
    .isString()
    .withMessage("Completa el campo con un string valido.");
};

const validationHeaderAuthorization = (headerName = "Authorization") => {
  return header(headerName)
    .isString()
    .withMessage("Completa el campo con un string valido.");
};
export {
  validationUsernameOrEmail,
  validationParamID,
  validationNameOrSurname,
  validationPrice,
  validationStock,
  validationState,
  validationBirthDate,
  validationEmail,
  validationPassword,
  validationQueryPage,
  validationQueryLimit,
  validationQueryNombre,
  validationQueryPrecioMin,
  validationQueryPrecioMax,
  validationQueryOrderBy,
  validationQueryOrder,
  validationHeaderAuthorization,
};
