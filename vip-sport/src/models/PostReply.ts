export class PostReply{
    constructor(
        public postId:number,
        public content:string,
        public ownerId:number,
        public type:string = "PostReply",
        public date?:string,
        public id?:number
    ){

    }
}