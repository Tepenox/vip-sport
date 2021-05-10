export class Thread {
    constructor(
        public id: number,
        public subcategoryId: number,
        public title: String,
        public ownerId: number,
        public date: String,
        public firstPostId: number,
        public lastPostId: number
    ) { }
}
  