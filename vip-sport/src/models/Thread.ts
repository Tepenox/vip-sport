export class Thread {
    constructor(
        public subcategoryId: number,
        public title: String,
        public ownerId: number,
        public firstPostId: number,
        public lastPostId: number,
        public id?: number,
        public date?: String
    ) { }
}
  