import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";
import { Todo } from "../../models";

@Component({
  selector: "todo-list-item",
  templateUrl: "./todo-list-item.component.html",
  styleUrls: ["./todo-list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListItemComponent implements OnInit {
  @Input() todo: Todo;
  constructor() {}

  ngOnInit() {}

  public get description(): string {
    return this.todo.description;
  }

  public get done(): boolean {
    return this.todo.done;
  }
}
