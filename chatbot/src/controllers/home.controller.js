exports.homeGet = (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/../' });
};
