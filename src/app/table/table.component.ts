import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableRow, CellEntry } from './tabelDataInterface';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges{
  @Input() header? : TableRow
  @Input() rows : TableRow[] = []
  
  
  ngOnChanges(changes: SimpleChanges): void {

    if (this.header && !this.header.clickRow) this.header.clickRow = this.emptyRow
    for(let row of this.rows) {
      if (!row.clickRow) row.clickRow = this.emptyRow
      for (let cell of row.cells) if (!cell.clickCell) cell.clickCell = this.emptyCell
    }
  }

  emptyRow = (row: TableRow) => {}
  emptyCell = (cell: CellEntry) => {}
}
