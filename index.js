const express = require ("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());



mongoose.connect('mongodb+srv://aliaayan6786:HiXsk4k4mFiTVzzF@cluster0.du8i98y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    ).then(()=>{
        console.log("DB Connected");
    }).catch((err)=>{
        console.log("Failed", err);
    })
// Product Schema
const productSchema = new mongoose.Schema({
    product_name : {
        type: String,
        required: true
    },
    product_price : {
        type: String,
        required: true
    },
    isInStock : {
        type: Boolean,
        required: true
    },
    category : {
        type: String,
        required: true
    }
})

const productModel = mongoose.model("products", productSchema);

app.post('/api/products', async(req, res) => {

    const product = productModel.create({
        product_name : req.body.product_name,
        product_price : req.body.product_price,
        isInStock : req.body.isInStock,
        category : req.body.category    
    })
    console.log(product)

    return res.status(201).json({message : "Product Created"});
});



// let courses = [
//     {"id" : 1, "name": "java"},
//     {"id" : 2, "name": "javascript"},
//     {"id" : 3, "name": "python"}
// ];

// app.get('/courses', (req, res) => {
//     res.json(courses);
// });

// app.post('/courses', (req, res) => {
//     console.log(req.body);
//     let singlecourse = {
//         id: courses.length + 1,
//         name: req.body.name
//     }
//     courses.push(singlecourse);
//     res.send(courses);
// });

// app.put('/courses/:id', (req, res) => {
//     try {
//         let singlecourse = courses.find((course) => {
//             return course.id === +req.params.id
//         })
    
//         if (!singlecourse) {
//             res.status(404).send('course does not exist');
//         }
//         singlecourse.name = req.body.name;
//         res.send(courses);
//         }  catch(err) {
//             res.status(500).send(err);
//         }
// });

// function logger(req, res, next){

//     console.log(req.ip);
//     console.log(req.hostname); 
//     console.log(req.method);
//     console.log(new Date().toISOString());
    
//     next();
// }

// function middleware(req, res, next) {
//     console.log("called");
//     next();
// }

const port = 3000;
app.listen(port, () => {
    console.log("Server is running on port 3000");
});