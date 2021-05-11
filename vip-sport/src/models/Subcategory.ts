export class Subcategory {
    constructor(
        public id: number,
        public name: string,
        public parentId: number,
        public description: string
    ) { }
}