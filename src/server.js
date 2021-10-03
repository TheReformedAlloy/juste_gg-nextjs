require("dotenv").config();
const express = require("express");
const next = require("next");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const morgan = require('morgan');

const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

const passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {User} = require('./mongodb');
const MongoStore = require('connect-mongo')(session);

const uid = require("uid-safe");

const authRoutes = require("./api/auth-routes");
const blogRoutes = require("./api/blog-routes");
const comicRoutes = require("./api/comic-routes");
const commentRoutes = require("./api/comment-routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "./src"
});
const handle = app.getRequestHandler();

const https = require('https');
const fs = require('fs');

const httpsOptions = {
    cert: fs.readFileSync(`${__dirname}/ssl/juste_gg.crt`),
    ca: fs.readFileSync(`${__dirname}/ssl/juste_gg.ca-bundle`),
    key: fs.readFileSync(`${__dirname}/ssl/juste_gg.key`)
}

app.prepare().then(() => {
    const server = express();
    
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}/info?retryWrites=true&w=majority`).catch(err => {
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

    const sessionConfig = {
        secret: uid.sync(18),
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection})
    };
    
    server.use(session(sessionConfig));
    
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(cookieParser());

    server.use(cors(corsOptions));
    
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(authRoutes);
    server.use('/api', blogRoutes);
    server.use('/api', comicRoutes);
    server.use('/api', commentRoutes);
    server.use('/admin', ensureAdmin);
    
    // handling everything else with Next.js
    server.get("*", handle);

    server.use(morgan(process.env.NODE_ENV === "production" ? 'dev' : 'tiny'));
    
    server.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    })
});

//Custom Authentication Middleware:
function ensureAuth(req, res, next) {
    if(!req.isAuthenticated()) return res.redirect("/login");
    next();
}

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