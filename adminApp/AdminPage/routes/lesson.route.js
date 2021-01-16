const express = require('express');
const fs = require("fs");
var multer = require('multer')
var upload = multer({ dest: 'resources/uploads/' })
const { v4: uuidv4 } = require('uuid');

const router = express.Router({ mergeParams: true });;

const lessonModel = require('../models/lesson.model');

router.get('/', async function (req, res) {
    req.session.retUrl = req.originalUrl
    courseId = req.params.id
    row = await lessonModel.all(`where courseId='${courseId}'`)
    res.render('./vwLesson/index', {
        lessons: row,
        courseId: courseId,
        currentUser: req.session.authUser
    })
})

router.get('/add', async function (req, res) {
    courseId = req.params.id
    res.render('./vwLesson/add', {
        courseId: courseId,
        currentUser: req.session.authUser
    })
})

router.post('/add', upload.single('lessonVideo'), async function (req, res) {
    course_id = req.params.id
    video = fs.readFileSync("resources/uploads/" + req.file.filename)
    entity = {
        id: uuidv4(),
        lessonName: req.body.lessonName,
        lessonVideo: video,
        lessonContent: req.body.lessonContent,
        courseId: courseId
    }
    fs.writeFileSync("resources/tmp/" + req.file.filename, video)
    await lessonModel.add(entity)
    res.redirect(`/course/detail/${course_id}/lesson`)
})

router.post('/delete/:id', async function (req, res) {
    await lessonModel.delete(req.params.id)
    return res.redirect(req.session.retUrl)
})

router.get('/edit/:id', async function(req, res) {
    lessonId = req.params.id
    row = await lessonModel.single(lessonId)
    res.render('./vwLesson/edit', {
        lesson: row,
        currentUser: req.session.authUser
    })
})

router.post('/edit/:id', upload.single('lessonVideo'), async function (req, res) {
    let id = req.params.id
    if (req.file) {
        video = fs.readFileSync("resources/uploads/" + req.file.filename)
        entity = {
            lessonName: req.body.lessonName,
            lessonVideo: video,
            lessonContent: req.body.lessonContent,
        }
    } else {
        entity = {
            lessonName: req.body.lessonName,
            lessonContent: req.body.lessonContent,
        }
    }
    await lessonModel.update(id, entity)
    return res.redirect(req.session.retUrl)
})
module.exports = router; 