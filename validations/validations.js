import { body, query, header } from "express-validator";

const validationNameOrSurname = (name) => {
  return body(name)
    .isString()
    .withMessage("Completa el campo.")
    .isLength({ min: 1, max: 100 })
    .withMessage("el nombre debe tener entre 1 y 100 caracteres.");
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
    .isDate()
    .withMessage("Completa el campo con una fecha válida.")
    .custom((value) => {
      const inputDate = new Date(value);
      const currentDate = new Date();
      if (inputDate >= currentDate) {
        return false;
      }
      return true; // Si pasa la validación, devolver true.
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

export {
  validationNameOrSurname,
  validationPrice,
  validationStock,
  validationState,
  validationBirthDate,
  validationEmail,
  validationPassword,
};
