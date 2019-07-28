var express = require ('express')

var app = express()
//imports handlebars and sets the main.handlebars as default layout
var handlebars = require ('express-handlebars').create({defaultLayout:'main'})
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine)
app.set('port', process.argv[2]);
app.set('view engine', 'handlebars')

//this helps parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//adapted from OSU CS290 cource materials:
//http://eecs.oregonstate.edu/ecampus-video/CS290/
//core-content/hello-node/express-forms.html

app.get('/', function (req, res){

    var method = "GET"

    //get the request parameters
    var queryParams =  []
    for (g in req.query){
        queryParams.push({'name':g,'value':req.query[g]})
    }

    //build the context
    var title = "Get/POST Checker"
    var context = {}
    context.title = title
    context.method = method

    context.data = queryParams
    res.render('home', context)
    //send a list of all garages with name, address, owner
})
app.post('/', function(req, res){
        //get the request parameters
        var method = "POST"
        var postParams =  []

        //parse the body to get parameters
        for (d in req.body){
            postParams.push({'name':d,'value':req.body[d]})
        }
    
        //build the context
        var title = "Get/POST Checker"
        var context = {}
        context.title = title
        context.method = method
    
        context.data = postParams
        res.render('home', context)
})

app.use(function(req, res){
    res.status(404)
    res.render('404', {title: 'Page Not Found'})
})

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
  })

var note = "The site is running on http://localhost:" + app.get('port')
note += "; press CTRL + C to stop."
app.listen(app.get('port'), function(){
    console.log(note)
})