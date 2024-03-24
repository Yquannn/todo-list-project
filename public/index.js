const savedNotes = localStorage.getItem('notes');
const savedCompletedNotes = localStorage.getItem('completedNotes');
document.addEventListener('DOMContentLoaded', function () {
  const main = document.getElementById("todo");
  const completeTodo = document.getElementById("complete");
  const completedTasks = [];

  document.getElementById('add-todo').addEventListener('click', addTodo);

  loadNotes();

  function addTodo() {
    const inputItem = document.querySelector('.input').value;
    if (inputItem === '') {
      alert('Add todo');
    } else {
      const divContainer = document.createElement('div');
      divContainer.setAttribute('class', 'todo-column');
      const divColumn = document.createElement('div');
      divColumn.setAttribute('class', 'todo-item');

      const inputCheckbox = document.createElement('input');
      inputCheckbox.setAttribute('class', 'checkbox');
      inputCheckbox.setAttribute('type', 'checkbox');
      inputCheckbox.addEventListener('click', markAsComplete);

      const note = document.createElement('p');
      const value = inputItem.trim();
      note.textContent = value;

      const date = document.createElement('input');
      date.setAttribute('class', 'date');
      date.setAttribute('type', 'date');

      divColumn.appendChild(inputCheckbox);
      divColumn.appendChild(note);
      divColumn.appendChild(date);

      divContainer.appendChild(divColumn);
      main.appendChild(divContainer);

      document.querySelector('.input').value = '';

      saveNotes();
    }
  }

  function markAsComplete() {
    const divContainer = document.createElement('div');
    divContainer.setAttribute('class', 'todo-column');
    const divColumn = document.createElement('div');
    divColumn.setAttribute('class', 'todo-item');

    const inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('class', 'checkbox');
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.checked = true;

    const note = document.createElement('p');
    note.textContent = this.nextSibling.textContent;

    const date = document.createElement('input');
    date.setAttribute('class', 'date');
    date.setAttribute('type', 'date');

    divColumn.appendChild(inputCheckbox);
    divColumn.appendChild(note);
    divColumn.appendChild(date);

    divContainer.appendChild(divColumn);
    completeTodo.appendChild(divContainer);

    // Add the task to the completedTasks array
    completedTasks.push(note.textContent);

    // Remove the task from the todo section
    this.parentElement.remove();
    
    saveNotes();
  }

  function deleteNote() {
    this.parentElement.remove();
    saveNotes();
  }

  function saveNotes() {
    const notes = [];
    const completedNotes = [];

    document.querySelectorAll('.todo-item p').forEach(savedNote => {
      if (!completedTasks.includes(savedNote.textContent)) {
        notes.push(savedNote.textContent);
      } else {
        completedNotes.push(savedNote.textContent);
      }
    });

    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('completedNotes', JSON.stringify(completedNotes));
  }


  function loadNotes() {

    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      notes.forEach(note => {
        const divContainer = document.createElement('div');
        divContainer.setAttribute('class', 'todo-column');
        const divColumn = document.createElement('div');
        divColumn.setAttribute('class', 'todo-item');

        const inputCheckbox = document.createElement('input');
        inputCheckbox.setAttribute('class', 'checkbox');
        inputCheckbox.setAttribute('type', 'checkbox');
        inputCheckbox.addEventListener('click', deleteNote);

        const noteElement = document.createElement('p');
        noteElement.textContent = note;

        const date = document.createElement('input');
        date.setAttribute('class', 'date');
        date.setAttribute('type', 'date');

        divColumn.appendChild(inputCheckbox);
        divColumn.appendChild(noteElement);
        divColumn.appendChild(date);

        divContainer.appendChild(divColumn);
        main.appendChild(divContainer);
      });
      console.log(savedNotes, 'saved')
      console.log(savedCompletedNotes, 'complete')
    }

    if (savedCompletedNotes) {
      console.log(savedNotes, 'saved')
      console.log(savedCompletedNotes, 'complete')



      const completedNotes = JSON.parse(savedCompletedNotes);
      completedNotes.forEach(note => {
        const divContainer = document.createElement('div');
        divContainer.setAttribute('class', 'todo-column');
        const divColumn = document.createElement('div');
        divColumn.setAttribute('class', 'todo-item');

        const inputCheckbox = document.createElement('input');
        inputCheckbox.setAttribute('class', 'checkbox2');
        inputCheckbox.setAttribute('type', 'checkbox');
        inputCheckbox.checked = true;
        inputCheckbox.addEventListener('click', deleteNote);

        

        const noteElement = document.createElement('del');
        noteElement.setAttribute('class', 'completeNotes')
        noteElement.textContent = note;
        

        const date = document.createElement('input');
        date.setAttribute('class', 'date');
        date.setAttribute('type', 'date');

        divColumn.appendChild(inputCheckbox);
        divColumn.appendChild(noteElement);
        divColumn.appendChild(date);

        divContainer.appendChild(divColumn);
        completeTodo.appendChild(divContainer);
      });
    }
  }
});
