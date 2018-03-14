import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "todo-filter-list",
  templateUrl: "todo-filter-list.component.html",
  styleUrls: ["todo-filter-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFilterListComponent implements OnInit {
  @Input() activeFilter: number;
  @Output() select: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}
}
