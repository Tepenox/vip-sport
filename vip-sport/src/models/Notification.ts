export class Notification {
    constructor(
        public type:string,
        public fromId:number,
        public reveiverId : number,
        public objectId : number,
        public date? : string,
        public id?:number
    ){
        
    }
}