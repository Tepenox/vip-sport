export class Thread {
    constructor(
        public id: number,
        public subcategoryId: number,
        public title: String,
        public firstPostId: number,
        public lastPostId: number
    ) { }
}
  