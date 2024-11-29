import compression from "compression";
import zlib from "zlib";
compression;

export const brotlimiddleware = compression({
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  },
  threshold: 1024,
  level: 6,
});
