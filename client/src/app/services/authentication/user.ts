export class User {

    public name: string;
    public surname: string;
    public nickName: string;
    public email: string;
    public password?: string;

    constructor(nickName: string, name: string, email: string) {
        this.nickName = nickName;
        this.name = name;
        this.email = email;
    }
}
