import { Console } from "console";
import * as fs from "fs";

export default function Log(err: any) {
  const genName = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
  const logFile = fs.createWriteStream(`./logs/${genName}.log`, { flags: "a" });
  // Custom simple logger
  const Logger = new Console({ stdout: logFile, stderr: logFile });

  Logger.log("-----------------------------");
  Logger.log(`[SQL ERROR]`);
  Logger.group();
  Logger.log("Code: ", err.code);
  Logger.log("Number: ", err.errno);
  Logger.log("Message: ", err.sqlMessage);
  Logger.groupEnd();
}
