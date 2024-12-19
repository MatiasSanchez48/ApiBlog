import {
  validationParamID,
  validationNameOrSurname,
  validationBirthDate,
  validationHeaderAuthorization,
} from "./validations.js";
export const getAutorValidation = [validationParamID()];
export const postAutorValidation = [
  validationHeaderAuthorization(),
  validationNameOrSurname("nombre"),
  validationNameOrSurname("apellido"),
  validationNameOrSurname("nacionalidad"),
  validationBirthDate(),
  validationNameOrSurname("bibliografia"),
  validationNameOrSurname("imagen"),
  validationNameOrSurname("redSocial"),
];

export const putAutorValidation = [
  validationParamID(),
  validationHeaderAuthorization(),
  validationNameOrSurname("nombre"),
  validationNameOrSurname("apellido"),
  validationNameOrSurname("nacionalidad"),
  validationBirthDate(),
  validationNameOrSurname("bibliografia"),
  validationNameOrSurname("imagen"),
  validationNameOrSurname("redSocial"),
];
export const deleteAutorValidation = [
  validationParamID(),
  validationHeaderAuthorization(),
];
