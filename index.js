const express = require ("express");
const app = express();


app.use(express.json());
app.use(logger);
app.use(middleware);

let courses = [
    {"id" : 1, "name": "java"},
    {"id" : 2, "name": "javascript"},
    {"id" : 3, "name": "python"}
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    console.log(req.body);
    let singlecourse = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(singlecourse);
    res.send(courses);
});

app.put('/courses/:id', (req, res) => {
    try {
        let singlecourse = courses.find((course) => {
            return course.id === +req.params.id
        })
    
        if (!singlecourse) {
            res.status(404).send('course does not exist');
        }
        singlecourse.name = req.body.name;
        res.send(courses);
        }  catch(err) {
            res.status(500).send(err);
        }
});

function logger(req, res, next){

    console.log(req.ip);
    console.log(req.hostname); 
    console.log(req.method);
    console.log(new Date().toISOString());
    
    next();
}

function middleware(req, res, next) {
    console.log("called");
    next();
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});