export class PostReply{
    constructor(
        public postId:number,
        public content:string,
        public ownerId:number,
        public type:string,
        public date?:string,
        public id?:number
    ){

    }
}