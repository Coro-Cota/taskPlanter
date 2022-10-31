const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const {
    getTasks,
    deleteTask,
    createTask,
    updateTask,
    editTaskName,
    getHTML,
    getCSS,
    getJS
} = require(`./controller`);

app.get('/', getHTML)
app.get(`/css`, getCSS)
app.get(`/js`, getJS)

app.get(`/api/task`, getTasks)
app.delete(`/api/task/:id`, deleteTask)
app.post(`/api/task`, createTask)
app.put(`/api/task/:id`, updateTask)
app.put(`/api/task`, editTaskName)

app.listen(4000, console.log('server running on 4000'))