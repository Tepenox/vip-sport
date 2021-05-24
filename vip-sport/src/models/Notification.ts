export class Notification {
    constructor(
        public type:string,
        public fromId:number,
        public receiverId : number,
        public objectIdUrl : string,
        public date? : string,
        public id?:number
    ){
        
    }
}