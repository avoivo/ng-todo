export interface Todo {
  id: number;
  description: string;
  done: boolean;
}

export function generateMockTodo(): Todo {
  return {
    id: 1,
    description: "dummy description",
    done: false
  };
}
