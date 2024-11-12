/// ejemplo de una validacion entre medio para saber
/// si un usuario esta logeado o no pase sobre una validacion entre medio.
/// son llamados middeleware de express van en la carpeta de middleware.

export const userLogger = (req, res, next) => {
  const userLogger = false;
  if (userLogger) {
    next();
  } else {
    res.status(401).json({ error: "no autorizado" });
  }
};
export const isAdmin = (req, res, next) => {
  const isAdmin = false;
  if (isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "no autorizado" });
  }
};
