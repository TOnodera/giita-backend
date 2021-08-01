import logger from "./logger";

class Config {

    private static githubOAuthInfo: any;
    private static githubUrl: string;
    private static appUrl: string;

    static url(){

        if(process.env.APP_URL){
            Config.appUrl = process.env.APP_URL;
        }else{
            throw new Error();
        }

        return Config.appUrl;
    }

    static github(){

        if(process.env.CLIENT_ID
            && process.env.CLIENT_SECRET
            && process.env.REDIRECT_URI
            && process.env.SCOPE
            && process.env.GITHUB_URL
            && process.env.GITHUB_TOKEN_EXPIRE_LIMIT){
   
            Config.githubOAuthInfo = {
               client_id: process.env.CLIENT_ID,
               client_secret: process.env.CLIENT_SECRET,
               redirect_uri: process.env.REDIRECT_URI,
               scope: process.env.SCOPE,
               expire_limit: process.env.GITHUB_TOKEN_EXPIRE_LIMIT
            };
            Config.githubUrl = process.env.GITHUB_URL;
   
         }else{
            throw new Error();
         }

        return {
            oauthInfo: Config.githubOAuthInfo,
            url: Config.githubUrl
        }
    }
}

export default Config;