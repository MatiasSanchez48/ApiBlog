import { postAutorService } from "../services/serviceAutor.js";
import {
  RegisterUser,
  LoginUser,
  RefreshToken,
} from "../services/serviceUsuario.js";
export const postRegisterUserController = async (req, res) => {
  try {
    const { username, password, email, fechaNacimiento } = req.body;
    const usuarioCreado = await RegisterUser(
      username,
      password,
      email,
      fechaNacimiento
    );
    if (usuarioCreado === -1) {
      return res.status(400).json({
        status: "error",
        message: "El usuario ya existe",
        data: { usuarioCreado: usuarioCreado },
      });
    }
    if (!usuarioCreado) {
      return res.status(400).json({
        status: "error",
        message: "error al crear el usuario",
        data: {},
      });
    }

    const autor = await postAutorService({
      id: usuarioCreado.id,
      nombre: username,
      fechaNacimiento: fechaNacimiento,
      apellido: "",
      nacionalidad: "",
      bibliografia: "",
      imagen: "",
      redSocial: "",
    });

    res.status(200).json({
      status: "success",
      message: "usuario creado",
      data: { usuarioCreado: usuarioCreado, autor: autor },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error al crear el usuario",
      data: { error: error.message },
    });
  }
};
export const postLoginUserController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await LoginUser(username, password);
    if (!accessToken || !refreshToken) {
      return res.status(400).json({
        status: "error",
        message: "credenciales incorrectas",
        data: {},
      });
    }
    res.status(200).json({
      status: "success",
      message: "sesion iniciada",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error al iniciar sesion",
      data: { error: error.message },
    });
  }
};
export const postRefreshUserController = async (req, res) => {
  try {
    const Refresh = req.headers["x-refresh-token"];

    if (!Refresh) {
      return res.status(400).json({
        status: "error",
        message: "token no proporcionado",
        data: {},
      });
    }

    const accessToken = await RefreshToken(Refresh);
    if (!accessToken) {
      return res.status(400).json({
        status: "error",
        message: "credenciales incorrectas",
        data: {},
      });
    }
    res.status(200).json({
      status: "success",
      message: "token refrescado",
      data: { accessToken },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error al refrescar el token",
      data: {},
    });
  }
};
