export class Topic {
    title: string;
    category: string;
    textContent: string;

    constructor(title: string, category: string, textContent: string) {
        this.title = title;
        this.category = category;
        this.textContent = textContent;
    }

    public getCoverImage(): string {
        switch (this.category.toLowerCase()) {
            case('temperatures'):
                return 'assets/images/desert.jpg';
            case ('pollution'):
                return 'assets/images/pollution.jpg';
            default:
                return 'assets/images/desert.jpg';
        }
    }
}
