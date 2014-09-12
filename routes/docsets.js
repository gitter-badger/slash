var slash = require('../app/slash');

exports.search = function(req, res) {
    slash.search(req.query).then(function(references) {
        res.send(references);
    });
};

exports.get = function(req, res) {
    slash.get(req.params.uri).then(function(references) {
        res.send(references);
    });
};

exports.get_docsets = function(req, res) {
    slash.get_docsets(req.params.uri).then(function(docsets) {
        res.send(docsets);
    });
};

exports.get_types = function(req, res) {
    slash.get_types(req.params.uri).then(function(docsets) {
        res.send(docsets);
    });
};

exports.children = function(req, res) {
    slash.get_id(req.params.uri).then(function(id) {
        if (id == null) {
            res.send([]);
        } else {
            slash.children(id).then(function(references) {
                res.send(references);
            });
        }
    });
};

