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

function submitHandler(e) {
    e.preventDefault()

    let task = document.querySelector(`#task-input`)
    let priority = document.querySelector(`input[name="priority"]:checked`)

    let bodyObj = {
        task: task.value,
        priority: priority.value
    }

    createTask(bodyObj)

    task.value = ''
    priority.checked = false
}

let createTaskLine = (theTask) => {
    const taskLine = document.createElement('div')
    taskLine.classList.add('task-line')
    
    taskLine.innerHTML = `
    <div class="task-wrapper">
    <p class="task-name">
    ${theTask.task}
    </p>
    <div class="btns-container">
        <button id="minus" onclick="updateTask(${theTask.id}, 'minus')">-</button>
        <p class="task-priority">
        ${theTask.priority} priority
        </p>
        <button id="plus" onclick="updateTask(${theTask.id}, 'plus')">+</button>
    </div>
    <button class="deleteTask" onclick="deleteTask(${theTask.id})">delete</button>
    </div>
    `
    taskContainer.appendChild(taskLine)
}

let displayTasks = (arr) => {
    taskContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createTaskLine(arr[i])        
    }
}

form.addEventListener('submit', submitHandler)

getAllTasks()