const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();

const {
    Comic,
    Counter
} = require('../mongodb');

const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'tmp/uploads/')
    }
});

const upload = multer({ storage });

router.use(bodyParser.json());

router.get('/comics', function(req, res) {
    Comic.find(req.query, (err, docs) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(docs) {
                const orderedImages = docs.sort((comic1, comic2) => comic2._id > comic1._id).slice(0, req.query.limit || 10);
                res.send(orderedImages);
            } else {
                res.status(404).end();
            }
        }
    });
});

function ensureAdmin(req, res, next) {
    if(req.isAuthenticated()) {
        if(req.user.admin == true) {
            next();
        } else {
            return res.redirect("/");
        }
    } else {
        return res.redirect("/login");
    }
}

router.post('/comics', ensureAdmin, upload.single('image'), function(req, res) {
    const {
        title,
        altText,
        description
    } = req.body;

    const img_data = fs.readFileSync(req.file.path);
    const contentType = req.file.mimetype;

    const newComic = new Comic({
        img: {
            data: img_data,
            contentType: contentType
        },
        title: title,
        altText: altText,
        description: description
    });

    newComic.save((err, obj) => {
        if(err) {
            console.log(err);
            res.status(400).send({ error: err });
        } else {
            res.redirect('/');
        }
    })
});

router.post('/comics/:cid', ensureAdmin, upload.single('image'), function(req, res) {
    const {
        title,
        altText,
        description
    } = req.body;

    const comicID = req.params.cid;

    let updatedComic = {
        title: title,
        altText: altText,
        description: description
    }

    if(req.file) {
        const img_data = fs.readFileSync(req.file.path);
        const contentType = req.file.mimetype;
        updatedComic.img = {
            data: img_data,
            contentType: contentType
        }
    }

    Comic.findOneAndUpdate({comicID}, updatedComic, () => {
        res.redirect('/');
    });

    

});

router.get('/comics/lastID', function(req, res) {
    Counter.findById('comicID', (err, doc) => {
        res.send({lastID: doc.seq});
    });
})

module.exports = router;