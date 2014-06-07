//    Dependencies
var htmlparser = require('htmlparser');

//-----------
//    Public
//-----------

exports.getWordBoxes = function(htmlString) {
    var handler = new htmlparser.DefaultHandler(function(error, dom) {
        if (error) {
            console.log('Error: ' + error);
            res.send(500, error);
        }
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(htmlString);

    var wordBoxes = [];
    var getWordBox = function(tagObjects) {
        tagObjects.forEach(function(tagObject) {
            if (tagObject.name === 'span' && tagObject.attribs.class === 'ocrx_word') {
                wordBoxes.push({
                    word: getWord(tagObject),
                    box: tagObject.attribs.title
                });
            } else if (tagObject.children !== undefined) {
                getWordBox(tagObject.children);
            }
        });
    };

    var getWord = function(tagObjects) {
        if (!(tagObjects instanceof Array)) {
            tagObjects = [tagObjects];
        }
        var word = '';
        tagObjects.forEach(function(tagObject) {
            if (tagObject.type === 'text' && tagObject.data !== undefined) {
                word = tagObject.data;
            } else if (tagObject.children !== undefined) {
                word = getWord(tagObject.children);
            }
        });
        return word;
    };

    getWordBox(handler.dom);
    return wordBoxes;
};
