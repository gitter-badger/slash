var Type = function(options) {
	
    var self = this;
	self.len = 0;
	self.uri = '';
	self.reference = '';
	self.children = [];
	self.types = [];
	self.schema = 'docset';


    self.fill = function(uri, type,callback) {
		$.ajax({
            url: '/api/search?docsets=' + uri + '&types=' + type,
            method: 'get'
        }).done(function(data) {
            data.forEach(function(referenceData) {
                self.children.push(Reference.create(referenceData));
				self.len++;
            });
			callback();
        });
    };

    self._store = function(fields) {
        for (var i in fields) {
            self[i] = fields[i];
        }
    };

}

Type.init = function(callback) {
	Type.instances = {};
};

//Create a new object Docset
Type.create = function(values) {
    if (!values || !values.uri) {
        throw new Error('missing argument \'uri\'');
    }

    if (Type.instances[values.uri] == undefined) {
        Type.instances[values.uri] = new Type(values.uri);
    }

    Type.instances[values.uri]._store(values);
	return Type.instances[values.uri];
}