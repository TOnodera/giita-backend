import { Request, Response } from "express";
import User from "../Domain/User";
import { v4 } from "uuid";
import AuthenticationError from "../Exception/AuthenticationError";
const moment = require("moment");
import Config from "../Utility/Config";

class GithubOparate {
   private user: User = new User();

   async redirectToGithubLogin(req: Request, res: Response) {
      //ログインURLにリダイレクト
      if (typeof req.body.login == "string" && req.body.login != "") {
         const state = v4();
         req.session.state = state;
         res.redirect(this.user.github().oauth().identityUrl(req.body.login, state));
         return;
      }
      res.redirect("/github_callback_error");
   }

   async getGithubAccessToken(req: Request, res: Response) {
      if (typeof req.query.code == "string" && typeof req.query.state == "string") {
         if (this.user.github().oauth().checkStateString(req.session.state, req.query.state)) {
            const codeResponse = await this.user.github().oauth().acceptCode(req.query.code);
            req.session.access_token = codeResponse.access_token;
            req.session.expire = moment()
               .add("H", Config.github().oauthInfo.expire_limit)
               .format("YYYY-MM-DD HH:mm:ss");

            return res.redirect(Config.url());
         }
         throw new AuthenticationError("stateが一致しませんでした。");
      }
      throw new AuthenticationError("codeまたはstateがURLクエリにありません。");
   }

   checkToken(req: Request, res: Response) {
      if (req.session.access_token) {
         if (req.session.expire) {
            const now = moment();
            const expire = moment(req.session.expire);
            if (now.isBefore(expire)) {
               return true;
            }
         }
      }
      return false;
   }

   getAccessToken(req: Request, res: Response) {
      if (this.checkToken(req, res)) {
         res.json({ access_token: req.session.access_token });
         return;
      }
      throw new AuthenticationError("有効なトークンがありません。Githubで認証処理を行って下さい。");
   }
}

export default GithubOparate;
