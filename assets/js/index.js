'use strict';

const tasks = [];

const taskInputElem = document.querySelector("input[name='task'");
const createTaskButtonElem = window.document.getElementById("createTaskButton");

const taskListElem = document.getElementById("taskList");

createTaskButtonElem.addEventListener('click', onCreateTaskButtonClick);
taskInputElem.addEventListener("keyup",onKeyupEnter);

const removeCompletedTasksButtonElem = document.getElementById("removeCompletedTasksButton");
removeCompletedTasksButtonElem.addEventListener('click',onRemoveCompletedTasksButtonClick);

function onRemoveCompletedTasksButtonClick(event) {
   const completedTasks = document.querySelectorAll("li[class='listItem completed']");
    // completedTasks.remove(); // в чем различие?
    // completedTasks.parentNode.removeChild(completedTasks);
    completedTasks.forEach(function (liItem) {
            liItem.remove();
        }
    );
    return false;
}

/*CREATE TASK ON BUTTON 'ADD TASK' CLICK*/
function onCreateTaskButtonClick(event) {
    createTask(event);
}

/*CREATE TASK ON 'ENTER' KEYUP*/
function onKeyupEnter(event) {
    if (event.which === 13 || event.keyCode === 13) {
        createTask(event);
        return false;
    }
    return true;
}

/*FUNCTION THAT CREATE TASK, CAN BE CALLED BY FUNCTIONS 'onCreateTaskButtonClick' 'onKeyupEnter'*/
function createTask(event) {
    const {value} = taskInputElem;
    if (value) {
        tasks.push(value);
        taskListElem.prepend(
            createTaskListItemElem({
                id: tasks.length - 1,
                value: taskInputElem.value[0].toUpperCase() + taskInputElem.value.slice(1)
            })
        );
        taskInputElem.value = "";
    }
}



function createTaskListItemElem(task) {
    const taskListItemElem = document.createElement("li");
    taskListItemElem.classList.add("listItem");
    taskListItemElem.setAttribute("id", task.id);
    taskListItemElem.innerText = task.value; // можно было через append
    taskListItemElem.appendChild(createCheckBoxElem(task));


    return taskListItemElem;
}

function createCheckBoxElem(task) {
    const taskCheckboxElem = document.createElement("input");
    taskCheckboxElem.setAttribute("type", "checkbox");
    taskCheckboxElem.setAttribute("data-taskid", task.id);
    taskCheckboxElem.onchange = onCheckBoxCheckedHandler;
    return taskCheckboxElem;
}

function onCheckBoxCheckedHandler() {
    document.getElementById(this.dataset.taskid).style.textDecoration = this.checked ? "line-through":"none";
    document.getElementById(this.dataset.taskid).classList.add("completed");

}