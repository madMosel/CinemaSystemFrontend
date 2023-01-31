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

export enum TableRowState {
    HIGHLIGHTED = "table-row-highlighted",
    NORMAL = "table-row",
    MARKED = "table-row-marked",
    CONFLICT = "table-row-conflict"
  }