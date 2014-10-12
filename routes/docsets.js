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

var JSONflatten = function  (arr) {
	return arr.reduce(function  (a,b) {
		if (b instanceof Array) {
			return a.concat(JSONflatten(b));
		}else{
			return a.concat(b);
		}
	},[]);
}

exports.branch = function(req, res) {
    slash.get_id(req.params.uri).then(function(id) {
        if (id == null) {
            res.send([]);
        } else {
            slash.branch(id).then(function(references){
				list = JSONflatten(references);
				res.send(list);
			});
        }
    });
};
