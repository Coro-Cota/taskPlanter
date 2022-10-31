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
            <button class="edit" onclick="editTask(${task.id})">edit</button>
    `

    // starting below is code that I need to enter to add an edit field in my task list, this is to be added above between the ``.
    // <form onsubmit="editTask(event,${task.id})">
    //     <input type="text" placeholder="Edit task" id="${task.id}">
    //     <button>submit</button>
    // </form> 
    taskContainer.appendChild(taskLine)
}

// const editTask = (evt,id) => {
//     //out edit task function takes 2 params. the event object, and the id of the task we want to edit.
//     evt.preventDefault() //we preventDefault so that the page doesn't refresh.
//     let editedTaskList = document.getElementById(`${id}`)
//     //using the id we stored inside the input field, and passed into the editTask function we select the desired input field
//     let taskToEdit = {
//         id,
//         title: editedTaskList.value //then we store the input user data on an object to send to the backend.
//     }
//     console.log(taskToEdit);
//     axios.put(baseURL, taskToEdit)//and send that object to the backend.
//     .then(response => {
//         tasksCallback(response)
//     })
//     .catch(err => console.log(err))
// }

let displayTasks = (arr) => {
    taskContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createTaskLine(arr[i])        
    }
}

form.addEventListener('submit', submitHandler)

getAllTasks()