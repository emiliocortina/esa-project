export class User {

    name: string;
    email: string;
    nickName: string;

    constructor(nickName: string, name: string, email: string) {
        this.nickName = nickName;
        this.name = name;
        this.email = email;
    }

}
