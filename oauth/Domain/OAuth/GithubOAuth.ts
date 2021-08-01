import { githubHttp } from "../../Utility/http";
import Config from '../../Utility/Config';
import logger from "../../Utility/logger";

class GithubOAuth implements iOAuth {
   
   checkStateString(setSate: string, acceptState: string): boolean {
      return setSate == acceptState;
   }

   identityUrl(login: string, state: string): string {
      logger.info(Config.github());
      return `${Config.github().url}/login/oauth/authorize?client_id=${Config.github().oauthInfo.client_id}&redirect_uri=${Config.github().oauthInfo.redirect_uri}&login=${login}&scope=${Config.github().oauthInfo.scope}&state=${state}`;
   }

   async acceptCode(code: string): Promise<CodeResponse> {
      const tokenEndpointRequest: TokenEndpointRequest = {
         client_id: Config.github().oauthInfo.client_id,
         client_secret: Config.github().oauthInfo.client_secret,
         code: code,
         redirect_uri: Config.github().oauthInfo.redirect_uri
      };

      const response = await githubHttp.post("/login/oauth/access_token", tokenEndpointRequest);
      const result: CodeResponse = response.data;

      return result;
   }
}

export default GithubOAuth;
