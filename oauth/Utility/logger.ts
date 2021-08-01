import log4js from "log4js";

log4js.configure({
   appenders: {
      console: {
         type: "console"
      },
      stderr: {
         type: "stderr"
      },
      system: {
         type: "file",
         level: "ALL",
         filename: "./Logs/system.log",
         maxLogSize: 1024 * 1024 * 5,
         backups: 5
      }
   },
   categories: {
      default: { appenders: ["system", "console","stderr"], level: "ALL" }
   }
});

const logger = log4js.getLogger();

export default logger;
