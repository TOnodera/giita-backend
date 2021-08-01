import ErrorHandler from "../Exception/ErrorHandler";
import express, { Request, Response } from "express";
import GithubOparate from "../Usecase/GithubOparate";

const route = (app: express.Application) => {
   const githubOparate = new GithubOparate();

   //Githubアクセストークンoauth
   app.post("/api/login/oauth/authorize", async (req: Request, res: Response) => {
      try {
         githubOparate.redirectToGithubLogin(req, res);
      } catch (e) {
         ErrorHandler.handle(e, res);
      }
   });

   //認可コード付きリダイレクトを処理
   app.get("/github_callback", async (req: Request, res: Response) => {
      if (req.query.error) {
         res.redirect(`/github_callback_error?error=${req.query.error}`);
         return;
      }
      try {
         await githubOparate.getGithubAccessToken(req, res);
      } catch (e) {
         ErrorHandler.handle(e, res);
      }
   });

   //アクセストークンチェック
   app.get("/api/github/check_token", (req: Request, res: Response) => {
      try {
         if (githubOparate.checkToken(req, res)) {
            return res.json({ isValid: true });
         }
         return res.json({ isValid: false });
      } catch (e) {
         ErrorHandler.handle(e, res);
      }
   });

   //セッションからトークン取得
   app.get("/api/github/access_token", (req: Request, res: Response) => {
      try {
         githubOparate.getAccessToken(req, res);
      } catch (e) {
         ErrorHandler.handle(e, res);
      }
   });
};

export default route;
