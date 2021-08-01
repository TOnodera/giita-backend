import app from "../init";
import request from "supertest";

describe("App", () => {
   it("indexにアクセス出来る", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
   });
   it("/github_callbackにリダイレクトされる際にクエリにerrorパラメータがある場合はリダイレクト", async () => {
      const response = await request(app).get("/github_callback?error=redirect_uri_missing");
      expect(response.statusCode).toBe(302);
   });
   it("acceptCodeにcodeが無い場合は401エラー", async () => {
      const response = await request(app).get("/github_callback");
      expect(response.statusCode).toBe(401);
   });
});
