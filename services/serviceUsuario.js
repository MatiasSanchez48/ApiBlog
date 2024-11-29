import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../model/modelUsuario.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generarTokens.js";
export const RegisterUser = async (username, password) => {
  const usuario = await Usuario.findOne({ username });
  if (usuario) {
    return -1;
  }
  const passhash = await bcrypt.hash(password, 10);
  const usuarioCreado = await Usuario.create({ username, password: passhash });
  return usuarioCreado;
};

export const LoginUser = async (username, password) => {
  const usuario = await Usuario.findOne({ username });
  if (!usuario) {
    return -1;
  }
  //comparar contraseñas con la del usuario y la contraseña del usuarios
  const passhash = await bcrypt.compare(password, usuario.password);
  if (!passhash) {
    return -1;
  }
  const accessToken = generateAccessToken({
    username: usuario.username,
    password: usuario.password,
    id: usuario._id,
  });
  const refreshToken = generateRefreshToken({
    username: usuario.username,
    password: usuario.password,
    id: usuario._id,
  });
  return { accessToken, refreshToken };
};
export const RefreshToken = async (RefreshToken) => {
  const user = jwt.verify(
    RefreshToken,
    process.env.JWT_REFRESH_SECRET || "unaclavesecreta"
  );
  const userDB = await Usuario.findOne({ username: user.username });
  if (!userDB) {
    return -1;
  }
  const accessToken = generateAccessToken({
    username: userDB.username,
    password: userDB.password,
    id: userDB._id,
  });
  return accessToken;
};
