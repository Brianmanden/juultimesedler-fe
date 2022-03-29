//Install express server
const express = require('express');
console.log("-1->>>" + express);
const path = require('path');
const app = express();

console.log( __dirname+'/src/index.html' );

// Serve only the static files form the dist directory
app.use( express.static( __dirname + '/src') );

app.get('/*', function(req,res) {
    res.sendFile( path.join(__dirname+'/src/index.html') );
});

// Start the app by listening on the default Heroku port
app.listen( process.env.PORT || 8080 );