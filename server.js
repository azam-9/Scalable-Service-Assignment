const express = require('express');
const http = require('https');
const mongoose = require('mongoose');
const Database = 'mongodb+srv://2020mt93696:Scalable%40Service@cluster0.q4mce.mongodb.net/SS_User?retryWrites=true&w=majority'
const app = express();
app.use(express.json());
mongoose.connect(Database).then(con => {
    console.log('connected to database...',con);
}).catch(err => console.log('error in connecting database...', err))

app.get('/user/:id',(req,res,_next)=>{

    const options ={
        'method' : 'GET',
        'headers': {
            'Content-Type' : 'application/json',
        } 
    }


    const request = http.request('https://my.api.mockaroo.com/ss_user.json?key=0a339f00',options, (response) => {
        let data = '';
        response.on('data', (chunk) => data += chunk);
        response.on('end', () => {
            console.log(req.params.id);
            const obj = JSON.parse(data);
            const customer = obj.find(c=>c.first_name === req.params.id);
            res.send(customer);
        });

    });
    request.on('error', (error) => console.log(error));
    request.end();

    
});
app.listen(3000,()=> console.log('Server is running on port 3000'));