//server.js

//set up
var express         = require('express');           //express framework
var app             = express();                    //app with express
var http            = require('http').Server(app);
var io              = require('socket.io')(http);   // socket.io
var nodemailer      = require('nodemailer');        // Node Mail module
var mongoose		= require('mongoose');			// mongoose for mongodb
//var morgan			= require('morgan');			// log requests to the console (express4)
var bodyParser		= require('body-parser');		// pull information from HTML POST (express4)
var methodOverride	= require('method-override');	// simulate DELETE and PUT (express4)

//mongo configuration
mongoose.set('debug', false);                           // mongoose debug mode
mongoose.connect('mongodb://localhost:27017/notes');	// connect to mongoDB database

//app settings
app.use(express.static('public'));           			// set the static files location
//app.use(morgan('tiny'));                                // log every request to the console
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

//Socket IO
io.on('connection', function(socket){

    User.create({ socketId: socket.id}, function(err) {
        if (err) return console.error(err);
    });

    socket.on('disconnect', function(){
        Note.remove({ _creator: socket.id}, function(err) {
            if (err) return console.error(err);
        });

        User.remove({ socketId: socket.id}, function(err) {
            if (err) return console.error(err);
        });
    });
});

//API Routes

//update
app.put('/api/notes', function(req, res) {
    Note.update({ _id : req.body.dbId }, { text: req.body.msg }, function(err) {
        if (err) res.send(err);
        res.send().end();
    });
});
//get all *NOT USED*
app.get('/api/notes', function(req, res) {
    res.send().end();
});

//create
app.post('/api/notes', function(req, res) {
    Note.create({
        text: req.body.text,
        _creator: req.body.client
    }, function(err) {
        if (err) res.send(err);

        Note.find({_creator: req.body.client}, function(err, notes) {
            if (err) res.send(err);
            res.json(notes);
        });
    });
});
//delete
app.delete('/api/notes/:noteId/:clientId', function(req, res) {
    Note.remove({
        _id : req.params.noteId
    }, function(err) {
        if (err) res.send(err);

        Note.find({_creator: req.params.clientId}, function(err, notes) {
            if (err) res.send(err);
            res.json(notes);
        });
    });
});

//Route SendMail
app.post('/send/msg', function(req, res) {
    /*TEMPORARY DISABLED*/
    /*
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'xxxx@xxx.com',
            pass: 'xxxxxx'
        }
    });

    var mailOptions = {
        from: 'Test MSG',
        to: 'xxxx@xxx.com, xxxx@xxx.by',
        subject: '',
        text: '',
        html: ''
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    */
    res.send().end();
});

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