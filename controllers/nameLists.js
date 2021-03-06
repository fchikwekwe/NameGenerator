/** Names routes here */
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
    // DELETE NAMES
    app.delete('/answers/delete', (req, res) => {
        const currentUser = req.user;
        NameList.deleteOne(req.params.id)
            .then(() => {
                res.redirect(`/users/${currentUser._id}`);
            }).catch((err) => {
                console.log(err.message);
            });
    });
};
