import { PostReply } from "./PostReply";

export class Post{
    constructor(
        public title:string, 
        public contentType:string, 
        public content:string, 
        public contentUrl:string, 
        public ownerId:number, 
        public categories:string, 
        public date?:string,
        public id?:number,
        public postReplies?:PostReply[]
    ){

    }
}