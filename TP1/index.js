
const express = require('express')      // call lib
const app = express();

app.use(express.json());                // to handle json requests 



// -------- CRUD -------- 

const todos = [{id: 1, title: "halo"}, {id: 2, title: "ni hao"}, {id: 3, title: "ola"}, {id: 4, title: "slm"}];


// Create

app.post('/api/todos/create', (req, res) => {
    todos.push(req.body);  
    res.send(todos);

})


// List

app.get('/api/todos', (req, res) => {
    res.send(todos);    
})



// Update

app.patch('/api/todos/update/:index', (req, res) => {
    const index = req.params.index;

    if(todos.length === 0){
        res.send("Empty array");
    
    } else {
        new_todos = todos.map((todo)=> 
            todo.id === parseInt(index) ? {...todo, ...req.body} : todo
        )

        res.send(new_todos);
    }
})


// Delete

app.delete('/api/todos/delete/:id', (req, res) => {
    const id = Number(req.params.id);

    new_todos = todos.filter(todo => todo.id !== id);

    res.send(new_todos);
})






app.get('/', (req, res)=>{
    res.send({message: 'hello there'});     // display msg, accept all types 
    res.json({message: ''});                // accept json only
    res.end();
})


app.get('/file', (req, res)=>{                          // app.get() : route
    res.sendFile(__dirname + "/public/index.html");     // display page index.html 
})



app.listen(5000, ()=>{
    console.log('Server listening on port 5000');

})