/** Put the about us route here */

module.exports = (app) => {
    app.get('/about', (req, res) => {
        res.render('about');
    });
};
