export class SignUpObject {
    public email: string;
    public name: string;
    public nickName: string;
    public password: string;
    public passwordRep: string;

    constructor(object: any) {
        this.email = (object.email) ? object.email : null;
        this.name = (object.name) ? object.name : null;
        this.nickName = (object.nickname) ? object.nickname : null;
        this.password = (object.password) ? object.password : null;
        this.passwordRep = (object.passwordRep) ? object.passwordRep : null;
    }


}
