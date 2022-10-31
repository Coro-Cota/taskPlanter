const path = require('path')
const tasks = require('./db.json')
let globalId = 4

module.exports = {
    getHTML:(req,res) =>{
        //path.join combines two segments of a file path
        res.sendFile(path.join(__dirname, "../public/index.html"))
    },
    getCSS:(req,res) =>{
        //path.join combines two segments of a file path
        res.sendFile(path.join(__dirname, "../public/styles.css"))
    },
    getJS:(req,res) =>{
        //path.join combines two segments of a file path
        res.sendFile(path.join(__dirname, "../public/main.js"))
    },
    getTasks: (req,res) =>{
        res.status(200).send(tasks)
    },
    deleteTask: (req,res) => {
        let index = tasks.findIndex(elem => elem.id === +req.params.id)
        tasks.splice(index,1)
        res.status(200).send(tasks)
    },
    createTask: (req,res) => {
        let { task, priority } = req.body
        let newTask = {
            id: globalId,
            task,
            priority
        }
        tasks.push(newTask)
        res.status(200).send(tasks)
        globalId++
    },
    updateTask: (req,res) => {
        let { id } = req.params
        let { type } = req.body
        let index = tasks.findIndex(elem => +elem.id === +id)
        if (tasks[index].priority === 5 && type === 'plus') {
            console.log("can't increase number");
            res.status(400).send('there is no higher priority')
        } else if (tasks[index].priority === 0 && type === 'minus') {
            res.status(400).send('priority cannot go lower')
        } else if (type === 'plus') {
            tasks[index].priority++
            res.status(200).send(tasks)
        } else if (type === 'minus') {
            tasks[index].priority--
            res.status(200).send(tasks)
        }else {
            res.sendStatus(400)
        }
    },    
    // editTask: (req,res) => {
    //     console.log('hit')
    //     let { id, title } = req.body //we destructure the obj we sent to the backend
    //     let index = tasks.findIndex(task => +task.id === +id) //find the task we want to edit in our task array
    //     tasks[index].title = title //and edit the title based on the user input from the frontend
    //     res.status(200).send(tasks) //then we send our edited task array back to the front, end and display the new task list.
    // }
}

console.log(module);