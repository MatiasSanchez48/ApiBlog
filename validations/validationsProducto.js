import {
  validationNameOrSurname,
  validationPrice,
  validationParamID,
  validationQueryPage,
  validationQueryLimit,
  validationQueryNombre,
  validationQueryPrecioMin,
  validationQueryPrecioMax,
  validationQueryOrderBy,
  validationQueryOrder,
  validationHeaderAuthorization,
} from "./validations.js";

export const postProductoValidation = [
  validationHeaderAuthorization(),
  validationNameOrSurname("nombre"),
  validationPrice(),
];

export const putProductoValidation = [
  validationHeaderAuthorization(),
  validationParamID(),
  validationNameOrSurname("nombre"),
  validationPrice(),
];
export const getProductoValidation = [validationParamID()];

export const deleteProductoValidation = [
  validationParamID(),
  validationHeaderAuthorization(),
];

export const getProductosFiltradosValidation = [
  validationQueryPage(),
  validationQueryLimit(),
  validationQueryNombre(),
  validationQueryPrecioMin(),
  validationQueryPrecioMax(),
  validationQueryOrderBy(),
  validationQueryOrder(),
];

export const getProductosPaginadosValidation = [
  validationQueryPage(),
  validationQueryLimit(),
];
