const express = require('express');
const fs = require("fs");
var multer = require('multer')
var upload = multer({ dest: 'resources/uploads/' })

const router = express.Router({ mergeParams: true });;

const lessonModel = require('../models/lesson.model');

router.get('/', async function (req, res) {
    course_id = req.params.id
    row = await lessonModel.all(`where courseId=${course_id}`)
    res.render('./vwLesson/index', {
        lessons: row,
        course_id: course_id
    })
})

router.get('/add', async function (req, res) {
    course_id = req.params.id
    res.render('./vwLesson/add', {
        course_id: course_id
    })
})

router.post('/add', upload.single('lessonVideo'), async function (req, res) {
    course_id = req.params.id
    video = fs.readFileSync("resources/uploads/" + req.file.filename)
    entity = {
        lessonName: req.body.lessonName,
        lessonVideo: video,
        content: req.body.content,
        courseId: course_id
    }
    fs.writeFileSync("resources/tmp/" + req.file.filename, video)
    await lessonModel.add(entity)
    res.redirect(`/course/detail/${course_id}/lesson`)
})

module.exports = router; 