export class User {

    public name: string;
    public nickName: string;
    public email: string;
    public password?: string;
    public avatarId?: string;

    constructor(nickName: string, name: string, email: string) {
        this.nickName = nickName;
        this.name = name;
        this.email = email;
    }

    getImageURL(): string {
        let path = '/assets/avatar/';
        if (this.avatarId) {
            path += this.avatarId + '.svg';
        }
        else {
            path += '6.svg';
        }
        return path;
    }
}
