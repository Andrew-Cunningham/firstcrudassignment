const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
// Use the array below to store the users. Add/remove/update items in it based off
let storage = [];
app.use(bodyParser.json());
let fs=require("fs")
//add new user
app.post('/storage/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);
 
  if (Number.isNaN(index) || index < 0 ) {
    
    return res.sendStatus(404);
  }

  var newUser = req.body;

  if (!newUser) {
    return res.sendStatus(400);
  }
 //console.log(req)
  storage[index] = newUser;
  fs.writeFileSync('./storage.json', JSON.stringify(storage));
  console.log(storage)
  res.json(newUser);
});

//Get all users
app.get('/storage', function(req, res) {
  res.json(storage);
});

//Get User by name
app.get('/storage/:name', function(req, res) {
  let names=req.params.name
  let userByName={}
  for(let i=0; i< storage.length; i++){
   // console.log(storage[i]['name'])
    if(storage[i]['name'] == names){
      userByName=storage[i]
    }
  }
  res.json(userByName);
});
//Update user
app.put('/storage/:name', function(req, res) {
  let names=req.params.name
  let userByNameUpdate={}
  console.log('UPDATE: '+ storage)
  for(let i=0; i< storage.length; i++){
   console.log(storage[i]['name'])
    if(storage[i]['name'] == names){
      userByNameUpdate=req.body
      storage[i]=req.body
      console.log(storage[i])
    }
  }
  
  fs.writeFileSync('./storage.json', JSON.stringify(storage));
  res.json(userByNameUpdate);
});
//delete user
app.delete('/storage/:name', function(req, res) {
  let names=req.params.name
  for(let i=0; i< storage.length; i++){
    // console.log(storage[i]['name'])
     if(storage[i]['name'] == names){
       
       storage.splice([i],1)
     }
   }
   console.log(storage)
   fs.writeFileSync('./storage.json', JSON.stringify(storage));
   res.json(storage)
  });

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})


