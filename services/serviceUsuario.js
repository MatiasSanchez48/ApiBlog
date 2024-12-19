import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../model/modelUsuario.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generarTokens.js";
export const RegisterUser = async (
  username,
  password,
  email,
  fechaNacimiento
) => {
  const usuario = await Usuario.findOne({ username });
  if (usuario) {
    return -1;
  }

  const passhash = await bcrypt.hash(password, 10);
  const usuarioCreado = await Usuario.create({
    id: crypto.randomUUID(),
    username: username,
    password: passhash,
    email: email,
    fechaNacimiento: new Date(fechaNacimiento),
  });

  return usuarioCreado;
};

export const LoginUser = async (username, password) => {
  const usuario = await Usuario.findOne({
    $or: [{ username: username }, { email: username }],
  });
  if (!usuario) {
    return -1;
  }
  //comparar contraseñas con la del usuario y la contraseña del usuarios
  const passhash = await bcrypt.compare(password, usuario.password);
  if (!passhash) {
    return -1;
  }
  const refreshToken = generateRefreshToken({
    username: usuario.username,
    id: usuario._id,
  });
  const accessToken = generateAccessToken({
    username: usuario.username,
    id: usuario._id,
  });
  const usuarioActualizado = await Usuario.findOneAndUpdate(
    { _id: usuario._id },
    { new: true }
  );
  if (!usuarioActualizado) {
    return res
      .status(500)
      .json({ status: 500, message: "Error al actualizar usuario" });
  }
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
    id: userDB._id,
  });
  return accessToken;
};
