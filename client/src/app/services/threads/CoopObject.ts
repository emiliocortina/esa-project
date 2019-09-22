
export class CoopObject {

    public text: string;
    public data: string[];

    constructor(object: any, dataIds) {
        this.text = (object.text) ? object.text : null;
        this.data = dataIds;
    }


}
