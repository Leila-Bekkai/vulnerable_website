const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


const users = {
    "fdhufj": "eidpcr",
    "jdiets": "wlfftj",
    "aocbrj": "aofhve"
};


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!(username in users)) {
        return res.status(401).json({ success: false, message: "Invalid username" });
    }

    if (users[username] !== password) {
        return res.status(403).json({ success: false, message: "Invalid password" });
    }

    req.session.user = username;
    return res.json({ success: true, redirectUrl: `/welcome.html?username=${encodeURIComponent(username)}` });
});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ success: false, message: "Logout failed" });
        }
        res.json({ success: true, message: "Logged out successfully", redirectUrl: `/index.html` });
    });
});


app.get('/session', (req, res) => {
    if (req.session.user) {
        return res.json({ loggedIn: true, username: req.session.user });
    }
    return res.json({ loggedIn: false });
});


app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});







