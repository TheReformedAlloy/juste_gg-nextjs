const mongoose = require('mongoose');
const passportLocalMongoose = require('../lib/passport-local-mongoose');

const Counter = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
try {
    mongoose.model('Counter', Counter);
} catch(e) {
    console.log("Counter already defined. Skipping.")
}

const counter = mongoose.model('Counter');

const User = mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
});
User.plugin(passportLocalMongoose);

const Comic = mongoose.Schema({
    comicID: {
        type: String
    },
    img: { 
        data: {
            type: 'Buffer'
        },
        contentType: String
    },
    title: String,
    altText: String,
    description: String
}, {
    timestamps: true
});

Comic.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'comicID'}, {$inc: { seq: 1} }, {new: true, upsert: true}, function(error, counter)   {
        if(error)
            return next(error);
        doc.comicID = counter.seq;
        next();
    });
});

const Blog = mongoose.Schema({
    blogID: String,
    authorID: String,
    authorName: String,
    title: String,
    content: String,
    keywords: [String]
}, {
    timestamps: true
});

Blog.index({'$**': 'text'});

Blog.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'blogID'}, {$inc: { seq: 1} }, {new: true, upsert: true}, function(error, count)   {
        if(error)
            return next(error);
        doc.blogID = count.seq;
        next();
    });
});

const Comment = mongoose.Schema({
    commentID: String,
    postID: String,
    authorID: String,
    authorName: String,
    text: String
}, {
    timestamps: true
});

Comment.index({'$**': 'text'});

Comment.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'commentID'}, {$inc: { seq: 1} }, {new: true, upsert: true}, function(error, count)   {
        if(error)
            return next(error);
        doc.commentID = count.seq;
        next();
    });
});

try {
    mongoose.model('User', User);
    mongoose.model('Comic', Comic);
    mongoose.model('Blog', Blog);
    mongoose.model('Comment', Comment);
} catch(e) {
    console.log('Models already defined. Skipping.');
}

module.exports = {
    User: mongoose.model('User'),
    Comic: mongoose.model('Comic'),
    Counter: mongoose.model('Counter')
};