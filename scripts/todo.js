const taskArray = [];
const taskContent = document.querySelector('.task');
const inputContent = document.querySelector('.todo-input');
const inputDate = document.querySelector('.todo-date');


// Allow pressing Enter to add task
inputContent.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

// Initial placeholder display
updateTaskList();

function addTask() {
  const taskName = inputContent.value;
  const taskDate = inputDate.value;
  if (taskName === '') return;


  taskArray.push({
    taskName, 
    taskDate
  });

  inputContent.value = '';
  updateTaskList();

  //focus on input field after added
  inputContent.focus(); 
}

document.querySelector('.add-button').addEventListener('click' , () => {
  addTask();
})

function updateTaskList() {
  if (taskArray.length === 0) {
    taskContent.innerHTML = '<span style="color: grey;">No tasks added yet...</span>';
    return;
  }

  taskContent.innerHTML = '';
  let taskContentHTML = '';

  taskArray.forEach((todoObject, index) => {
    const { taskName, taskDate } = todoObject;
    const html = `
      <div class="content-section">
        <div class="user-content">
          <div class="task-name">${taskName}</div>
          <div class="task-date">${taskDate}</div>
        </div>
        <button class="remove-btn">Delete</button>
      </div>
      <div class="liner";></div>
    `
    
    taskContentHTML += html;
    
    // Add separator line if not last task
    if (index < taskArray.length - 1) {
      taskContentHTML += `<div class="separate-line"></div>`;
    }

    taskContent.innerHTML = taskContentHTML;
    
    document.querySelectorAll('.remove-btn')
      .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
          taskArray.splice(index, 1);
          updateTaskList();
        });
      }
    );    
  });
}