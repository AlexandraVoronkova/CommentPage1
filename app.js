var express = require( 'express' );
var bodyParser = require ( 'body-Parser' );

var app = express();

app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json());

var Comments=require('./models/comment.js').Comment;

//Обработчик корня '/'
app.get('/',function (req, res) {
	Comments.find({}, function(err, comments){
		if(err) {
			res.send(err);
		}
		else{
			res.render('index.ejs', {comments:comments});
		}
	});
});

app.post('/',function(req,res){
	res.redirect('/write');
});

app.get('/write',function(req, res){
	res.render('write.ejs');
});

//обработчик получения данных
app.post('/write',function(req,res){
	//получаем переменные с данными из формы /write
	var name=req.body.name; 
	var comment=req.body.comment;
	//добавление комментария в БД
	var newComm = new Comments({name: name, comment:comment});
	newComm.save();
	//перейти обратно в корень сайта
	res.redirect('/');
});

app.listen(3000,function(){
	console.log('Work on port : 3000');
});
