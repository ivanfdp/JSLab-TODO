import './styles';

import { Todo, TodoList } from './classes/index';
import { createTaskHtml } from './js/componentes';

export const taskList = new TodoList();

taskList.tasks.forEach((task) => {
  createTaskHtml(task)
});