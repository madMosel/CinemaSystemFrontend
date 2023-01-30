export interface TableRow {
    classRow : string,
    clickRow : (row : TableRow) => void,
    cells : CellEntry[],
    identifier : any
}

export interface CellEntry {
    value : string,
    classCell : string,
    clickCell : (cell : CellEntry) => void,
    identifier: any
} 
