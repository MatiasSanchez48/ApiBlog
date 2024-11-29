import {
  RegisterUser,
  LoginUser,
  RefreshToken,
} from "../services/serviceUsuario.js";
export const postRegisterUserController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuarioCreado = await RegisterUser(username, password);
    if (usuarioCreado === -1) {
      return res
        .status(400)
        .json({ status: "error", message: "el usuario ya existe", data: {} });
    }

    res.status(200).json({
      status: "success",
      message: "usuario creado",
      data: { usuarioCreado },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "error al crear el usuario",
      data: {},
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
    res
      .status(200)
      .json({
        status: "error",
        message: "credenciales incorrectas",
        data: { accessToken, refreshToken },
      });
  } catch (error) {}
};
export const postRefreshUserController = async (req, res) => {
  try {
    const  Refresh  = req.headers["x-refresh-token"];

    if (!Refresh) {
      return res.status(400).json({
        status: "error",
        message: "error en el servidor",
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
