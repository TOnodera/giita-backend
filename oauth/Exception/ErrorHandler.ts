import { Response } from "express";
import logger from "../Utility/logger";
import AuthenticationError from "./AuthenticationError";
import DomainError from "./DomainError";

class ErrorHandler {
   static handle(e: Error,res: Response) {

      if(e instanceof DomainError){
         logger.error(e.log());
         return res.status(e.status()).json({message: e.message});
      }

      if(e instanceof AuthenticationError){
         logger.error(e.log());
         return res.status(e.status()).json({message: e.message});
      }

      //どのエラーにも該当しなかった場合の処理
      logger.fatal(this.unexpectedErrorLogFormat(e));
      res.status(500).json({message: "サーバーエラーが発生しました。"});

   }
   static unexpectedErrorLogFormat(e: Error){
      return `message: ${e.message}\nstack: ${e.stack}`;
   }
}

export default ErrorHandler;
