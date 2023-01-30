import { Component, Input } from '@angular/core';
import { TableEntry, CellEntry } from './tabelDataInterface';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
    @Input() header? : TableEntry
    @Input() rows : TableEntry[] = []
}
