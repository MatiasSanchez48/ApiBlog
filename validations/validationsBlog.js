import {
  validationParamID,
  validationNameOrSurname,
  validationHeaderAuthorization,
} from "./validations.js";

export const getBlogValidation = [validationParamID()];

export const postBlogValidation = [
  validationHeaderAuthorization(),
  validationNameOrSurname("titulo"),
  validationNameOrSurname("descripcion"),
  validationNameOrSurname("contenido"),
  validationNameOrSurname("imagen"),
  validationNameOrSurname("autor"),
];

export const putBlogValidation = [
  validationParamID(),
  validationHeaderAuthorization(),
  validationNameOrSurname("titulo"),
  validationNameOrSurname("descripcion"),
  validationNameOrSurname("contenido"),
  validationNameOrSurname("imagen"),
];

export const deleteBlogValidation = [
  validationParamID(),
  validationHeaderAuthorization(),
];
