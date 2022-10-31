const taskContainer = document.querySelector('#task-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/task`

const tasksCallback = ({ data: tasks }) => displayTasks(tasks)
const errCallback = err => console.log(err.response.data)

const getAllTasks = () => {
    axios.get(baseURL)
    .then(tasksCallback)
    .catch(errCallback)
}
const createTask = (body) => {
    axios.post(baseURL, body)
    .then(tasksCallback)
    .catch(errCallback)
}
const deleteTask = id => axios.delete(`${baseURL}/${id}`).then(tasksCallback).catch(errCallback)
const updateTask = (id, type) => {
    axios.put(`${baseURL}/${id}`, {type})
    .then(tasksCallback)
    .catch(errCallback)
}
// to change priority from numbers to words, you create a dropdown of five strings in the front end and keep the backend integers. google dropdown and select tag and options, "select tag doc" should help me link the numbers to strings. nested elements that has options, each option has a value that can be asigned numbers. the user will see the words rather than the numbers

const editTaskName = (e) => {
    e.preventDefault()
    const { editTaskData } = e.target;
    axios.put(`${baseURL}`, editTaskData)
    .then(tasksCallback)
    .catch(errCallback)
}

function submitHandler(e) {
    e.preventDefault()

    let task = document.querySelector(`#task-input`)

    let bodyObj = {
        task: task.value,
        priority: 1
    }

    createTask(bodyObj)

    task.value = ''
}

let createTaskLine = (theTask) => {
    const { id, task, priority } = theTask;

    const taskLine = document.createElement('div')
    taskLine.classList.add('task-line')
    
    taskLine.innerHTML = `
        <div id="taskLine-${id}">
            <div class="task-wrapper">
                <p class="task-name">
                    ${task}
                </p>
                <div class="edit-task-wrapper">
                    <form id="editTaskNameForm-${id}">
                        <input class="inputValue" type="text" value="${task}"></input>
                        <button class="update" type="submit">update</button>
                    </form>
                </div>
                <button class="edit-task-name">edit</button>
                <div class="btns-container">
                    <button id="minus" onclick="updateTask(${id}, 'minus')">-</button>
                        <p class="task-priority">
                            ${priority} priority
                        </p>
                    <button id="plus" onclick="updateTask(${id}, 'plus')">+</button>
                </div>
                <button class="deleteTask" onclick="deleteTask(${id})">delete</button>
            </div>
        </div>
    `
    taskContainer.appendChild(taskLine)

    // i need to query for additional elements after they're added to the dom
    const taskNameElement = document.querySelector(`#taskLine-${id} .task-name`);
    const taskWrapperElement = document.querySelector(`#taskLine-${id} .task-wrapper`);
    const editTaskBtn = document.querySelector(`#taskLine-${id} .edit-task-name`);
    const editTaskWrapper = document.querySelector(`#taskLine-${id} .edit-task-wrapper`);
    const editTaskNameForm = document.querySelector(`#editTaskNameForm-${id}`);
    const editTaskNameFormInput = document.querySelector(`#editTaskNameForm-${id} input`);

    // when the .task-name is clicked -> toggle visibility for the .task-wrapper and .edit-task-form
    editTaskBtn.addEventListener('click', () => {
        console.log('hit');
        taskNameElement.style.display = 'none';
        editTaskWrapper.style.display = 'block';
        editTaskBtn.style.display = 'none';
    })

    // this creates an object on the e.target passed with the dom eventListener -> we can access it via e.target.editTaskData in the invoked function

    // inline submit function to toggle visibility and call editTaskName() on submit
    editTaskNameForm.addEventListener('submit', (e) => {
        taskWrapperElement.style.display = 'flex';
        editTaskWrapper.style.display = 'none';
        editTaskNameForm.editTaskData = {
            id: id,
            task: editTaskNameFormInput.value
        };
        editTaskName(e)
    });
}

let displayTasks = (arr) => {
    taskContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createTaskLine(arr[i])        
    }
}

form.addEventListener('submit', submitHandler)

getAllTasks()