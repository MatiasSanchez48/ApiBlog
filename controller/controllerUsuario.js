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
        status: 400,
        message: "El usuario ya existe",
        data: { usuarioCreado: usuarioCreado },
      });
    }
    if (!usuarioCreado) {
      return res.status(400).json({
        status: 400,
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
      status: 200,
      message: "usuario creado",
      data: { usuarioCreado: usuarioCreado, autor: autor },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "error al crear el usuario",
      data: { error: error.message },
    });
  }
};
export const postLoginUserController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken, usuarioActualizado } = await LoginUser(
      username,
      password
    );
    if (!accessToken || !refreshToken) {
      return res.status(400).json({
        status: 400,
        message: "credenciales incorrectas",
        data: {},
      });
    }
    res.status(200).json({
      status: 200,
      message: "sesion iniciada",
      data: { accessToken, refreshToken, usuario: usuarioActualizado },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "error al iniciar sesion",
      data: { error: error.message },
    });
  }
};
export const postRefreshUserController = async (req, res) => {
  try {
    const refreshToken = req.headers["x-refresh-token"];

    if (!refreshToken) {
      return res.status(400).json({
        status: 400,
        message: "token no proporcionado",
        data: {},
      });
    }

    const accessToken = await RefreshToken(refreshToken);
    if (!accessToken) {
      return res.status(400).json({
        status: 400,
        message: "credenciales incorrectas",
        data: {},
      });
    }
    res.status(200).json({
      status: 200,
      message: "token refrescado",
      data: { accessToken },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "error al refrescar el token",
      data: { error: error.message },
    });
  }
};
