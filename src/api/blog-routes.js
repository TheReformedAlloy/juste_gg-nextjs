const express = require('express');
const router = express.Router();

const {Blog} = require('../mongodb');

function ensureAdmin(req, res, next) {
    if(req.isAuthenticated()) {
        if(req.user.admin == true) {
            next();
        } else {
            return res.redirect("/login");
        }
    } else {
        return res.redirect("/login");
    }
}

router.get('/blog', (req, res) => {
    Blog.find(req.query, (err, docs) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(docs) {
                const orderedBlogs = docs.sort((blog1, blog2) => blog2._id > blog1._id).slice(0, req.query.limit || 10);
                res.send(orderedBlogs);
            } else {
                res.status(404).end();
            }
        }
    })
});

router.get('/blog/search', (req, res) => {
    const searchObj = {
        ...req.query,
        q: undefined,
        $text: {$search: req.query.q || ''}
    };
    
    Blog.find(searchObj, (err, docs) => {
        res.send(docs);
    });
});

router.get('/blog/:id', (req, res) => {
    Blog.findOne({blogID: req.params.id}, (err, doc) => {
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

router.post('/blog', ensureAdmin, function(req, res) {
    const {
        postTitle,
        postText,
        postKeywords
    } = req.body;

    const newBlog = new Blog({
        title: postTitle,
        content: postText,
        authorID: req.user._id,
        authorName: req.user.username,
        keywords: postKeywords.split(', ')
    });

    newBlog.save((err, obj) => {
        if(err) {
            console.log(err);
            res.status(400).send({ error: err });
        } else {
            res.redirect('/blog');
        }
    });
});

router.post('/blog/:id', ensureAdmin, async function(req, res) {
    const {
        postTitle,
        postText,
        postKeywords
    } = req.body;

    const blogID = req.params.id;

    const updatedBlog = {
        title: postTitle,
        content: postText,
        keywords: postKeywords.split(', ')
    };

    const update = await Blog.findOneAndUpdate({blogID}, updatedBlog);
    res.redirect(`/blog/${blogID}`);
});

router.delete('/blog/:id', ensureAdmin, function(req, res) {
    const blogID = req.params.id;

    Blog.findOneAndDelete({blogID}, () => {
        res.redirect('/blog');
    });
});

module.exports = router;