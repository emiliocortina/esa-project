export class ThreadObject {
    public title: string;
    public category: string;
    public head: string;

    constructor(object: any) {
        this.title = (object.title) ? object.title : null;
        this.category = (object.category) ? object.category : null;
        this.head = (object.head) ? object.head : null;
    }


}
