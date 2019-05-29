const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
// Use the array below to store the users. Add/remove/update items in it based off
let storage = [];
app.use(bodyParser.json());

app.post('/storage/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);
 console.log(req.body)
  if (Number.isNaN(index) || index < 0 ) {
    
    return res.sendStatus(404);
  }

  var newUser = req.body;

  if (!newUser) {
    return res.sendStatus(400);
  }
 console.log(req)
  storage[index] = newUser;
 
  console.log(storage)
  res.json(newUser);
});

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})
