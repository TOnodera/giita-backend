interface iOAuth {
   identityUrl(login: string, state: string): string;
   acceptCode(code: string): Promise<CodeResponse>;
   checkStateString(setSate: string, acceptState: string): boolean;
}
