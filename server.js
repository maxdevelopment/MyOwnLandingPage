//server.js

//set up
var express         = require('express');           //express framework
var app             = express();                    //app with express
var http            = require('http').Server(app);
var io              = require('socket.io')(http);   // socket.io
var mongoose		= require('mongoose');			// mongoose for mongodb
var morgan			= require('morgan');			// log requests to the console (express4)
var bodyParser		= require('body-parser');		// pull information from HTML POST (express4)
var methodOverride	= require('method-override');	// simulate DELETE and PUT (express4)

//mongo configuration
mongoose.set('debug', true);                            // mongoose debug mode
mongoose.connect('mongodb://localhost:27017/notes');	// connect to mongoDB database

//app settings
app.use(express.static('public'));           			// set the static files location
app.use(morgan('dev'));                                 // log every request to the console
app.use(bodyParser.json());                             // parse application/json
app.use(methodOverride());                              // delete & put requests

//define mongoose models
var UserSchema = new mongoose.Schema({
    socketId: {
        type: String,
        unique: true
    }
});
var User = mongoose.model('User', UserSchema);

var NoteSchema = new mongoose.Schema({
    _creator: {type: String, ref: 'User'},
    text: String
});
var Note = mongoose.model('Note', NoteSchema);

//Routes
app.get('/notes', function(req, res) {
    res.sendFile('notes.html', {root: __dirname + '/public'}, function(err) {
        res.status(404).end();
    });
});

app.get('*', function(req, res) {
    res.status(404).end();
});

//Listen port
http.listen(80, function() {
    console.log("App listening on port 80");
});