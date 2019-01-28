const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3001;

app.use(cors());
app.options('*', cors());

app.get('/play', function(req, res) {
  let arr = [];
  for (i = 0; i < 3; i++) {
    let val = Math.floor(Math.random() * 5) + 1;
    arr.push(val);
  }
    res.send(JSON.stringify(arr));
});

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});
