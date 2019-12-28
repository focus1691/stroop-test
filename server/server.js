const path = require('path');
const port = process.env.PORT || 8081;
const express = require('express');
const app = express();
const server = require('http').Server(app);

const publicPath = path.join(__dirname, '../');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(publicPath + 'index.html');
});

server.listen(port, () => {
    console.log('\t :: Express :: Listening on port ' + port );
});