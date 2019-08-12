export class StatsField {

    name: string;
    value: number;
    unit: string;
    color: string;

    constructor(name: string, value: number, unit: string, color: string) {
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.color = color;
    }

    getOverview(): string {
        let info = '';
        info += this.value + ' ';
        info += this.unit;
        return info;
    }
}
