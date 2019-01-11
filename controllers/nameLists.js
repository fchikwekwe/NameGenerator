const NameList = require('../models/nameList');

module.exports = (app) => {
    app.post('/answers', (req, res) => {
        const currentUser = req.user;
        NameList.create(req.body)
            .then((names) => {
                res.cookie('chosenNames', names, {
                    maxAge: 900000,
                    httpOnly: true,
                });
                res.clearCookie('nameOptions');
                if (currentUser) {
                    res.redirect(`/${currentUser._id}/answers`);
                }
                else {
                    res.redirect('/sign-up');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
};


// logged in user
// takes the Quiz
// sees names and chooses the ones they want to save
// updates names and routes to user profile