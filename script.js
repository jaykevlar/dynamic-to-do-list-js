// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage and display them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false means don't save again to Local Storage
  }

  // Save all current tasks from the DOM to Local Storage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      // Exclude the remove button text
      const taskText = li.firstChild.textContent.trim();
      tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Add a new task to the list and optionally save it to Local Storage
  function addTask(taskText, save = true) {
    if (!taskText) {
      alert('Please enter a task.');
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove task on clicking remove button
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      saveTasks();
    };

    // Append remove button to list item
    li.appendChild(removeBtn);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = '';

    // Save to Local Storage if needed
    if (save) {
      saveTasks();
    }
  }

  // Add task when clicking the button
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
  });

  // Add task when pressing Enter key in input field
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      addTask(taskText);
    }
  });

  // Load existing tasks on page load
  loadTasks();
});
