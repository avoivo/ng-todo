import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "todo-filter-list-item",
  templateUrl: "todo-filter-list-item.component.html",
  styleUrls: ["todo-filter-list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFilterListItemComponent implements OnInit {
  @Input() text: string;
  @Input() clickable: boolean;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
}
