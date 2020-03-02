import { Todo } from '../classes';

import { taskList } from '../index';

// References to HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnCompleted  = document.querySelector('.clear-completed');
const ulFilters     = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');
const todoList      = document.documentElement.querySelector('.todo-list');
const todoCount     = document.querySelector('.todo-count');


export const createTaskHtml = (task) => {

  const taskHtml = `<li class="${(task.completed) ? 'completed' : ''}" data-id="${task.id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${(task.completed) ? 'checked' : ''}>
        <label>${task.name}</label>
        <button class="destroy"></button>
		</div>
    <input class="edit" value="Create a TodoMVC template">
	</li>`;

  const div = document.createElement('div');
  div.innerHTML = taskHtml;

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;

}

// Events
txtInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    const newTask = new Todo(txtInput.value);
    taskList.newTask(newTask);
    createTaskHtml(newTask);
    txtInput.value = '';
  }
});

divTodoList.addEventListener('click', (event) => {
  const elementName = event.target.localName; // imput, label, button
  const elementTask = event.target.parentElement.parentElement;
  const taskId      = elementTask.getAttribute('data-id');

  if (elementName.includes('input')) { // click in check
    taskList.toggleTask(taskId);
    elementTask.classList.toggle('completed');
  }
  if (elementName.includes('button')) {
    taskList.deleteTask(taskId);
    divTodoList.removeChild(elementTask);
  }

});

btnCompleted.addEventListener('click', (event) => {
  taskList.deleteCompleted();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elem = divTodoList.children[i]
    if (elem.className === 'completed') {
      elem.remove();
    }

  }

});

ulFilters.addEventListener('click', (event) => {
  const filter = event.target.text;

  if (!filter) { return };

  anchorFilters.forEach(element => element.classList.remove('selected'));
  event.target.classList.add('selected');

  for (const element of divTodoList.children) {
    element.classList.remove('hidden');
    const completed = element.classList.contains('completed');

    switch (filter) {
      case 'Pendientes':
        if (completed) {
          element.classList.add('hidden');
        }
        break;

      case 'Completados':
        if (!completed) {
          element.classList.add('hidden');
        }
        break;

      default:
        break;
    }
  }

});

const mutationObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    const taskCount = taskList.checkCompleted();
    todoCount.innerHTML = `<strong>${taskCount}</strong> pendiente(s)`;
  });
});

mutationObserver.observe(todoList, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});