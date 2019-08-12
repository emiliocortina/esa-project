export class LoginObject {
    public email: string;
    public password: string;

    constructor(object: any) {
        this.email = (object.email) ? object.email : null;
        this.password = (object.password) ? object.password : null;
    }


}
