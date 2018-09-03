const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const tasks = [];

app.post('/tasks', (request, response) => {

    const body = request.body;
    const task = {
        id: Math.random().toString().replace('0.', ''),
        title: body.title,
        resume: body.resume,
        isDone: body.isDone,
        isPriority: body.isPriority
    };

    tasks.push(task);
    response.status(201);
    response.send(task);

});

app.get('/tasks', (request, response) => {
    response.send(tasks);
});

app.get('/tasks/:taskId', (request, response) => {

    const task = tasks.filter( t => t.id === request.params.taskId);
    
    if (task) {
        response.send(task);
    } else {
        response.status(404);
        response.send();
        
    }

});

app.listen(3000, () => {
    console.log('Server Running on port 3000');
});