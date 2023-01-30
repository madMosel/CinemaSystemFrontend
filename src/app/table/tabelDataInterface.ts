export interface TableRows {
    classRow : string,
    clickRow : (event : Event) => void,
    cells : CellEntry[],
}

export interface CellEntry {
    value : string,
    classCell : string,
    clickCell : (event : Event) => void
} 
