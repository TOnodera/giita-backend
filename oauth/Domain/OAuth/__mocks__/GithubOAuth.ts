const mock = jest.fn().mockImplementation(() => {
   const oauthInfo: OAuthInfo = {
      client_id: "test_client_id",
      client_secret: "test_client_secret",
      redirect_uri: "test_redirect_uri",
      scope: "test_scope"
   };
   const state = "test_state";
   return {
      identityUrl: jest.fn((login: string) => {
         return `https://github.com/login/oauth/authorize?client_id=${oauthInfo.client_id}&redirect_uri=${oauthInfo.redirect_uri}&login=${login}&scope=${oauthInfo.scope}&state=${state}`;
      }),
      acceptCode: jest.fn(async (code: string, state: string) => {
         const response: CodeResponse = {
            access_token: "test_access_token",
            token_type: "test_token_type",
            scope: "test_scope"
         };
         return response;
      }),
      getOAuthInfo: () => oauthInfo
   };
});

export const mockCalucurator = jest.fn();
export default mock;
