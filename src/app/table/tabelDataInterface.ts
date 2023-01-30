export interface TableEntry {
    classRow : string,
    clickRow? : (event : Event) => {},
    entries : CellEntry[],
}

export interface CellEntry {
    value : string,
    classCell : string,
    clickCell? : (event : Event) => {},
} 