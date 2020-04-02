const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Project = require('./routes/project');
const path = require('path');
//body parser setup
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


//middleware
app.use('/api/project', Project);
app.set('views' , 'views')
app.set('view engine' , 'ejs')

//database setup
const url = "mongodb+srv://test:test@lpudevapp-uj2xp.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(url , {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
.then(() => console.log('connected to database'))
.catch(e => console.log(e))




//port setup
const port = process.env.PORT  || 3000;

app.get('/', (req, res) => {
   res.send("hello world")
})



app.listen(port , () => console.log(`connected to port ${port}`))