var userModel = require('./user.model');
var express = require('express');
var app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// ejs
app.set('views', 'views/');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('layout.ejs', {
        template: 'main.ejs',
    });
});
app.get('/reg', function(req, res){
    res.render('layout.ejs', {
        template: 'reg.ejs',
        alert: "",
        form: {
            login: "",
            pass: "",
            email: "",
        },
        reg_ok: false
    });
});
app.post('/reg', async function(req, res){
    let alert_message = "";
    let reg_ok = false;
    try {
   
        if(req.body.login == "" || req.body.pass == "" || req.body.email == ""){
            throw new Error("Поле не должен быть пустым");
        }

        if (/(.*[0-9]+)/g.test(req.body.pass) == false || /(.*[A-Z]{2,})/g.test(req.body.pass) == false || /(.*[\!\@\#\$])/g.test(req.body.pass) == false) {
            throw new Error('Пароль должен содержать цифру , 2 больших буквы и символь');
        }
    
        await userModel.create({
            email: req.body.email,
            password: req.body.pass,
            login: req.body.login
        });
        reg_ok = true;
    } catch (error) {
        if (error.code == 11000){
            alert_message = 'Такой емайл уже зарегестрирован';
        } else {
            alert_message = error.message;
        }
    } finally {
        res.render('layout.ejs', {
            template: 'reg.ejs',
            alert: alert_message,
            form: {
                login: req.body.login,
                pass: req.body.pass,
                email: req.body.email, 
            },
            reg_ok: reg_ok,
        });
    }   
});
app.listen(3000);