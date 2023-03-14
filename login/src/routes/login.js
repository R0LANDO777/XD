const express = require('express');
const LoginController = require('../controllers/LoginController');
const adminController = require('../controllers/adminController.js');

const router = express.Router();

///Son las redirecciones para que funcione el sistema

router.get('/login', LoginController.index);
router.get('/acerca', LoginController.acerca);
router.post('/registra', LoginController.storeUser);
router.post('/entrar', LoginController.auth);
router.get('/logout', LoginController.logout);


router.get('/personal', adminController.tabla);
router.get('/altaPersonal', adminController.personal);
router.post('/registraPer', adminController.registraPerso)
router.get('/editar/:idUser', adminController.editar);
router.get('/elimina/:idUser', adminController.elimina);
router.post('/editar/:idUser', adminController.update);
module.exports = router;