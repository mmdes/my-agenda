const Contact = require('../models/ContactModel')

exports.index = function (req, res) {
    res.render('contact.ejs');
}

exports.render = async function (req, res) {


    try {
        const contact = new Contact(req.body);
        await contact.register();
        if (contact.errrors.length > 0) {
            req.flash('errors', contact.errrors)
            req.session.save(() => {
                res.redirect('/contact/index');
                return;
            });
            return;
        }

        req.flash('success', 'Your contact was successfully registered.')
        req.session.save(() => res.redirect('/contact/index'));
        return;

    } catch (e) {
        console.error(e)
        return res.render('404');
    }
};