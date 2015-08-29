var Sessions = {
    put: function(req, res, next) {
        if (req.params.id != 1) {
            return res.status(401).send({ message: 'Unauthorized'});
        }
        var newSessionData = req.body;

        if (newSessionData) {
            req.session.data = newSessionData;
        }
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.status(200).json(req.session.data);
    },

    get: function(req, res, next) {
        if (req.params.id != 1) {
            return res.status(401).send({ message: 'Unauthorized'});
        }
        res.setHeader("Cache-Control", "no-cache, must-revalidate");
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.json(req.session.data);
    }
};

module.exports = Sessions;
