const bcrypt = require('bcrypt');

function personal(req, res) {
    if (req.session.loggedin == true) {
        res.render('pages/altaPersonal', { name: req.session.name });
    } else {
        res.redirect('/')
    }
}

function tabla(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users', (err, per) => {
            if (err) {
                console.log(err);
            } else {
                if (req.session.loggedin == true) {
                    res.render('pages/personal', { per, name: req.session.name })
                } else {
                    res.redirect('/')
                }
            }
        })
    })
}

function registraPerso(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if (userdata.length > 0) {
                res.render('pages/altaPersonal', { name: req.session.name, error: 'ya existe el email' })
            } else {
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash;

                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO `users` SET ?', [data], (err, rows) => {
                            res.redirect('/personal');
                        })
                    })
                })
            }
        })
    })

}

function elimina(req, res) {
    id = req.params.idUser;
    console.log(id)
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM users WHERE idUser = ?', [id], (err, rows) => {
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM users', (err, per) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (req.session.loggedin == true) {
                            res.render('pages/personal', { per, name: req.session.name })
                        } else {
                            res.redirect('/')
                        }
                    }
                })
            })
        });
      })
}

function editar(req, res) {
    id = req.params.idUser;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE idUser =?', [id], (err, per) => {
            if (err) {
                console.log(err);
            } else {
                if (req.session.loggedin == true) {
                    res.render('pages/editaPer', { per, name: req.session.name })
                } else {
                    res.redirect('/altaPersonal');
                }
            }
        })
    })
}

function update(req, res) {
    const id = req.params.idUser;
    console.log(id);
    const data = req.body;
    console.log(data);
    if(data.password.length < 5){
        delete data.password;
        console.log(data);
    }
    console.log(data)
    req.getConnection((err, conn) => {
       conn.query('UPDATE users SET ? WHERE idUser = ?', [data, id], (err, rows) => {
           if(err){
               console.log(err);
           }
           res.redirect('/personal')
       });
     });
}



module.exports = {
    personal,
    tabla,
    editar,
    update,
    elimina,
    registraPerso
}