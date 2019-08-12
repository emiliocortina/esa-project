export class SignUpObject {
    public email: string;
    public name: string;
    public surname: string;
    public password: string;
    public passwordRep: string;

    constructor(object: any) {
        this.email = (object.email) ? object.email : null;
        this.name = (object.name) ? object.name : null;
        this.surname = (object.surname) ? object.surname : null;
        this.password = (object.password) ? object.password : null;
        this.passwordRep = (object.passwordRep) ? object.passwordRep : null;

    }


}
