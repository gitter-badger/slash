var slash_parser = require('../app/slash_parser');

describe('processContentLinks', function(){
    it('should replace all original links with slash generated links', function(done){
        var references = [{content:'## Class: Cipher[\\#][0]\n\nClass for encrypting data.\n\
\n\
Returned by `crypto.createCipher` and `crypto.createCipheriv`.\n\
\n\
Cipher objects are [streams][1] that are both readable and\n\
writable. The written plain text data is used to produce the\n\
encrypted data on the readable side. The legacy `update` and `final`\n\
methods are also supported.\n\
\n\
\n\
[0]: #crypto_class_cipher\n\
[1]: stream.html\n\
[2]: http://xuaps.com'}];
        var links = {'#crypto_class_cipher':'node.js v0.10.29/crypto/cipher',
                    'stream.html':'juas'};

        slash_parser.processContentLinks(references, links).then(function(references){
            expect(references[0].content).not.toContain('[0]: #crypto_class_cipher');
            expect(references[0].content).toContain('[0]: node.js%20v0.10.29/crypto/cipher');
            expect(references[0].content).toContain('[2]: http://xuaps.com');
            done();
        });
    });
});