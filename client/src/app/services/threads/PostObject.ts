export class PostObject {
    public text: string;

    constructor(object: any) {
        this.text = (object.text) ? object.text : null;
    }


}
