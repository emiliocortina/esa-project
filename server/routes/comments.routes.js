const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/comment.controller');

//Cualquier peticion de comentarios, aqui o en topic devolvera la primera generacion hija de comentarios
router.post('/comment/:id', ctrl.commentOnTopic); //id del topic en el que se comenta
router.get('/comment/:id', ctrl.getComment);
router.post('/answerComment/:id', ctrl.answerToComment); //el id es el del comentario al que se responde
router.delete('/comment/:id', ctrl.deleteComment);

module.exports = router;
