export class Post{
    constructor(
        public title:string, 
        public contentType:string, 
        public content:string, 
        public contentUrl:string, 
        public onwerId:number, 
        public categories:string, 
        public date?:string,
        public id?:string  
          
    ){

    }
}