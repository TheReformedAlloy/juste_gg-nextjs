const express = require('express');
const router = express.Router();

const {Comment} = require('../mongodb');

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(400).end();
    }
}

router.get('/comments', (req, res) => {
    Comment.find(req.query, (err, docs) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(docs) {
                const orderedComments = docs.sort((doc1, doc2) => doc2._id > doc1._id).slice(0, req.query.limit || 10);
                res.send(orderedComments);
            } else {
                res.status(404).end();
            }
        }
    })
});

router.get('/comments/search', (req, res) => {
    Comment.find({$text: {$search: req.query.q || ''}}, (err, docs) => {
        res.send(docs);
    });
});

router.get('/comments/:id', (req, res) => {
    Comment.findOne({commentID: req.params.id}, (err, doc) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(doc) {
                res.send(doc);
            } else {
                res.status(404).end();
            }
        }
    })
});

router.get('/comments/post/:postID', (req, res) => {
    Comment.find({postID: req.params.postID, ...req.query}, (err, docs) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(docs) {
                const orderedComments = docs.sort((doc1, doc2) => doc2._id > doc1._id).slice(0, req.query.limit || 10);
                res.send(orderedComments);
            } else {
                res.status(404).end();
            }
        }
    })
})

router.post('/comments', ensureAuthenticated, function(req, res) {
    const {
        postID,
        content
    } = req.body;

    const newComment = new Comment({
        postID,
        authorID: req.user._id,
        authorName: req.user.username,
        text: content
    });

    newComment.save((err, obj) => {
        if(err) {
            console.log(err);
            res.status(400).send({ error: err });
        } else {
            res.status(200).end();
        }
    });
});

router.post('/comments/:id', ensureAuthenticated, function(req, res) {
    Comment.findOne({commentID: req.params.id}, (err, doc) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(doc) {
                if(doc.userID == req.user._id) {
                    const {
                        content
                    } = req.body;

                    const updatedComment = {
                        content
                    }

                    Comment.findOneAndUpdate(doc, updatedComment, (err, doc) => {
                        res.status(200).end();
                    })
                } else {
                    res.status(400).end();
                }
            } else {
                res.status(404).end();
            }
        }
    })
    
});

router.delete('/comments/:id', ensureAuthenticated, function(req, res) {
    Comment.findOne({commentID: req.params.id}, (err, doc) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(doc) {
                if(doc.userID == req.user._id) {
                    const commentID = req.params.id;

                    Blog.findOneAndDelete({commentID}, () => {
                        res.status(200).end();
                    });
                } else {
                    res.status(400).end();
                }
            } else {
                res.status(404).end();
            }
        }
    })
});

module.exports = router;