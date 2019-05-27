const express = require('express');

const app = express();
var path = require('path');
const PORT = process.env.PORT = 8081;
console.log(__dirname)
app.use(express.static(__dirname + '/build/'));
app.get('/a',(req,res)=>{
   console.log("jjj");
  res.sendFile('build/index.html')
})
app.listen(PORT, () => {
  console.log('Server is running at:',PORT);
});
