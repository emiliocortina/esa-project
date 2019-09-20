export class EsaMission {
    id: string;
    name: string;
    previewLabels: string[];
    contentParagraphs: string[];
    link: string;

    constructor(id: string, name: string, link: string ) {
        this.id = id;
        this.name = name;
        this.previewLabels = [];
        this.contentParagraphs = [];
        this.link = link;
    }

    getCoverImageURL() {
        return 'assets/images/' + this.id + '.jpg';
    }

    getIconURL() {
        return 'assets/agencies/esa/missions/' + this.id + '.svg';
    }
}
