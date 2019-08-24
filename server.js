//Install express server
const express = require('express');
const path = require('path');
 
const app = express();
 
// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/my-appx'));
 
app.get('*', function(req,res) {
  // Replace the '/dist/my-appx/index.html'
  res.sendFile(path.join(__dirname + '/dist/my-appx/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);