document.addEventListener('DOMContentLoaded', function () {
  const main = document.getElementById("todo");
  const completeTodo = document.getElementById("complete");

  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  const savedCompletedNotes = JSON.parse(localStorage.getItem('completedNotes')) || [];

  document.getElementById('add-todo').addEventListener('click', addTodo);

  loadNotes();

  function addTodo() {
    const inputItem = document.querySelector('.input').value;
    if (inputItem === '') {
      alert('Add todo');
    } else {
      const noteText = inputItem.trim();
      const todoItem = createTodoItem(noteText);
      main.appendChild(todoItem.container);
      document.querySelector('.input').value = '';
      todoItem.checkbox.addEventListener('click', markAsComplete);
      saveNotes();
    }
  }

  function createTodoItem(noteText) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('todo-column');

    const divColumn = document.createElement('div');
    divColumn.classList.add('todo-item');

    const roundDiv = document.createElement('div');
    roundDiv.classList.add('round');

    const inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.setAttribute('id', 'checkbox');
    inputCheckbox.classList.add('rounded-checkbox');

    inputCheckbox.addEventListener('click', () => {
      window.location.reload();
    });

    const label = document.createElement('label');
    label.setAttribute('for', 'checkbox');

    const noteElement = document.createElement('p');
    noteElement.textContent = noteText;

    const span = document.createElement('span');
    span.innerHTML = "\u00d7";

    span.addEventListener('click', (e) => {
      if (e.target.tagName === 'SPAN') {
        const todoItem = e.target.parentElement.parentElement;
        main.removeChild(todoItem); // Remove from todo container
        completeTodo.removeChild(todoItem); // Remove from complete container
        saveNotes(); // Update savedNotes
      }
    });

    roundDiv.appendChild(inputCheckbox);
    roundDiv.appendChild(label);

    divColumn.appendChild(roundDiv);
    divColumn.appendChild(noteElement);
    divColumn.appendChild(span);

    divContainer.appendChild(divColumn);

    return { container: divContainer, checkbox: inputCheckbox };
  }

  function saveNotes() {
    const notes = [...main.querySelectorAll('.todo-item p')].map(note => note.textContent);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function loadNotes() {
    savedNotes.forEach(note => {
      const todoItem = createTodoItem(note);
      main.appendChild(todoItem.container);
      todoItem.checkbox.addEventListener('click', markAsComplete);
    });

    savedCompletedNotes.forEach(note => {
      const todoItem = createTodoItem(note);
      todoItem.checkbox.checked = true; // Mark as completed
      completeTodo.appendChild(todoItem.container);
    });
  }

  function markAsComplete() {
    const todoItem = this.parentElement.parentElement;
    const noteText = todoItem.querySelector('p').textContent;

    if (this.checked) {
      savedCompletedNotes.push(noteText);
      localStorage.setItem('completedNotes', JSON.stringify(savedCompletedNotes));

      const index = savedNotes.indexOf(noteText);
      if (index !== -1) {
        savedNotes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(savedNotes));
      }

      main.removeChild(todoItem); // Remove from todo container
      completeTodo.appendChild(todoItem); // Move to complete container
    } else {
      const index = savedCompletedNotes.indexOf(noteText);
      if (index !== -1) {
        savedCompletedNotes.splice(index, 1);
        localStorage.setItem('completedNotes', JSON.stringify(savedCompletedNotes));
      }

      completeTodo.removeChild(todoItem); // Remove from complete container
      main.appendChild(todoItem); // Move back to todo container
      
    }
    
    window.location.reload(); // Reload the page
  }

  
});

function deleteAll(){
  localStorage.clear()
  alert('deleted')
  window.location.reload()
}
