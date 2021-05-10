export class Like {
    constructor(
        public subjectId:number,
        public subjectType:"Post"|"PostReply",
        public ownerId : number,
        public id?:number
    ){
        
    }
}