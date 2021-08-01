import GithubOAuth from "../OAuth/GithubOAuth";

class Github {
   private _oauth: iOAuth;
   constructor() {
      this._oauth = new GithubOAuth();
   }
   oauth() {
      return this._oauth;
   }
}

export default Github;
