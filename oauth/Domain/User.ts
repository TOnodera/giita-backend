import Github from "./Github/Github";

class User {
   private _github: Github;
   constructor() {
      this._github = new Github();
   }
   //githubの機能を委譲
   github() {
      return this._github;
   }
}

export default User;
