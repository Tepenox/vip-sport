export class Thread {
    constructor(
        public subcategoryId: number,
        public title: string,
        public ownerId: number,
        public id?: number,
        public date?: string
    ) { }
}
  