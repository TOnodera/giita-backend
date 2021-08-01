import axios from "axios";

const githubHttp = axios.create({
   baseURL: "https://github.com/",
   headers: {
      Accept: "application/json"
   }
});

const localTestHttp = axios.create({
   baseURL: "http://host.docker.internal:8080",
   headers: {
      Accept: "application/json"
   },
   transformResponse: (data: any)=>{
      console.log(data);
   }
});

export { githubHttp, localTestHttp };
