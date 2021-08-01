interface OAuthInfo {
   client_id: string;
   client_secret: string;
   redirect_uri: string;
   scope: string;
}

interface TokenEndpointRequest {
   client_id: string;
   client_secret: string;
   code: string;
   redirect_uri: string;
}

interface CodeResponse {
   access_token: string;
   token_type: string;
   scope: string;
}
