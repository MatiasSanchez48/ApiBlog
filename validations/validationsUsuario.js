import {
  validationNameOrSurname,
  validationUsernameOrEmail,
  validationPassword,
  validationEmail,
  validationBirthDate,
  validationHeaderAuthorization,
} from "./validations.js";

export const postRegisterValidation = [
  validationNameOrSurname("username"),
  validationPassword(),
  validationEmail(),
  validationBirthDate(),
];
export const postLoginValidation = [
  validationUsernameOrEmail(),
  validationPassword(),
];

export const postRefreshTokenValidation = [
  validationHeaderAuthorization("x-refresh-token"),
];
