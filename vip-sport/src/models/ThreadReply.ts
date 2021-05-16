export class ThreadReply {
    constructor(
        public threadId: number,
        public ownerId: number,
        public content: String,
        public id?: number,
        public date?: String
    ) { }
}
  