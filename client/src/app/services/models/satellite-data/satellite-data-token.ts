/**
 * A key-value pair token. Represents a point in a graph, this
 * is, a value for a given type of data at a date on time.
 * 
 * TODO use it on the satellite data model
 */
export class StatsField {

    date: string; // Data (x axis of the graph)
    value: number; // Numerical value (y axis of the graph)
    type: string; // Pollution, temperature, tides, etc.

    constructor(date: string, value: number, type: string) {
        this.value = value;
        this.date = date;
        this.type = type;
    }
}
