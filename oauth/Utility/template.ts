import path from 'path';


const template = (): string=>{
        const filePath = path.join(__dirname,'../../../frontend/dist/index.html');
        return filePath;
}

export default template;