login = (req, res) => {
    console.log(req.body)

    res.send('hi from login post');
};

register = (req, res) => {
    res.send('hi from register');
};

module.exports = {
    login,
    register,
};
