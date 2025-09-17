const fs = require("fs");
const path = require("path");
const { createLogger, transports, format } = require("winston");

const Dir = path.join(__dirname, "../logs");

if (!fs.existsSync(Dir)) {
  fs.mkdirSync(Dir, { recursive: true });
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(Dir, "error.log"), level: "error" }),
    new transports.File({ filename: path.join(Dir, "combined.log") })
  ]
});

module.exports = logger;