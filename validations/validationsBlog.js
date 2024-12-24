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
  validationNameOrSurname("autor"),
];

export const putBlogValidation = [
  validationParamID(),
  validationHeaderAuthorization(),
  validationNameOrSurname("titulo"),
  validationNameOrSurname("descripcion"),
];

export const deleteBlogValidation = [
  validationParamID(),
  validationHeaderAuthorization(),
];
