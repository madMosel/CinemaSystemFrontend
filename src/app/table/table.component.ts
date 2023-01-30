import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableRows, CellEntry } from './tabelDataInterface';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges{
  @Input() header? : TableRows
  @Input() rows : TableRows[] = []
  
  
  ngOnChanges(changes: SimpleChanges): void {

    if (this.header && !this.header.clickRow) this.header.clickRow = this.emptyFunktion
    for(let row of this.rows) {
      if (!row.clickRow) row.clickRow = this.emptyFunktion
      for (let cell of row.cells) if (!cell.clickCell) cell.clickCell = this.emptyFunktion
    }
  }

  emptyFunktion = (event : Event) => {}
}
