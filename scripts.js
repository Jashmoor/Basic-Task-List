// Global Constants and Variables //
const time = setInterval(getDate,1000);
const toggleDisp = document.querySelector('.newTask');
const taskResult = document.getElementById('taskresults');
const newTask = document.getElementById('addNew');
let displayCheck = false;
let taskArray = localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : [];
let taskList = JSON.parse(localStorage.getItem('task'));

// Event Listeners //
newTask.addEventListener('click', displayAdd);
document.getElementById('addANewTask').addEventListener('click', saveTask);
document.getElementById('clearAll').addEventListener('click', clearStore);

//Page Set-Up
newTask.innerHTML = "New Task_";

// Functions //
function getDate(){
 let date = new Date();
 let now = date.toLocaleTimeString();
 document.getElementById('getTime').innerHTML = now;
};

function displayAdd(){
  newTask.innerHTML = (!displayCheck ? "Close_" : "NewTask_");
  toggleDisp.classList.toggle('taskdisplay');
  displayCheck = (!displayCheck);
};


function saveTask(e){
  e.preventDefault();
  let taskName = document.getElementById('taskName').value;
  let taskDesc = document.getElementById('taskDesc').value;
  let tasks = {
    name:taskName,
    desc:taskDesc
  };
  taskArray.push(tasks);
  localStorage.setItem('task', JSON.stringify(taskArray));
  taskList = JSON.parse(localStorage.getItem('task'));
  getTasks();
  document.getElementById('taskDesc').value = "";
  document.getElementById('taskName').value = "";
};

function getTasks(){
  if (localStorage.length == 0){
    taskResult.innerHTML = '<div class="task-item">No Tasks</div>'
  } else {
    while (taskResult.firstChild){
      taskResult.removeChild(taskResult.firstChild);
    }
    for (let i = 0 ; i < taskList.length ; i++){
    let div = document.createElement('div');
    let div2 = document.createElement('div');
    div.textContent = taskList[i].name;
    div2.textContent = "--  " + taskList[i].desc;
    div.classList.add('task-item');
    div2.classList.add('task-item');
    div.addEventListener('click', complete);
    taskResult.appendChild(div);
    div.appendChild(div2);
  }
  }
};

function complete(){
  this.remove();
  if(taskResult.childElementCount == 0){
   clearStore();
  }
};
function clearStore(){
  localStorage.clear();
  getTasks();
};
