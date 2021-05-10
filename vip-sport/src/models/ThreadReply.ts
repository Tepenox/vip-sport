export class ThreadReply {
    constructor(
        public id: number,
        public threadId: number,
        public ownerId: number,
        public date: String,
        public content: String
    ) { }
}
  