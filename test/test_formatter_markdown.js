/**
 * Created by mohammad on 3/19/2019 AD.
 */

const fs = require('fs');
const chai = require('chai');

import MarkdownFormatter from '../lib/documentary/formatter/markdown';

const expect = chai.expect;


describe('Test Markdown Formatter', function() {
    let docFilePath, markdownFormatter, fileDescriptor;

    before(function(done) {
        docFilePath = `${__dirname}/temp/markdown.md`;
        fs.open(docFilePath, 'w+', function (err, fd) {
            fileDescriptor = fd;
            markdownFormatter = new MarkdownFormatter(fileDescriptor);
            done();
        });
    });

    after(function() {
        fs.closeSync(fileDescriptor);
        fs.unlinkSync(docFilePath);
    });

    it('Test methods', function(done) {
        markdownFormatter.writeHeader('This is title level 1');
        markdownFormatter.writeHeader('This is title level 2', {level: 2});
        markdownFormatter.writeParagraph('This is paragraph');
        markdownFormatter.writeList(['Item 1', 'Item 2']);
        markdownFormatter.writeTable([['a1', 'b1', 'c1'], ['a2', ['b2'], ['c2']]]);
        markdownFormatter.writeTable([['a1', 'b1', 'c1'], ['a2', ['b2'], ['c2']]], {headers: ['A', 'B', 'C']});

        expect(fs.existsSync(docFilePath)).to.be.true;
        let docContent = fs.readFileSync(docFilePath, 'utf8');
        expect(docContent.trim()).to.be.equal(
`# This is title level 1

## This is title level 2

This is paragraph

* Item 1
* Item 2

Column1 | Column2 | Column3
---|---|---
a1 | b1 | c1
a2 | b2 | c2

A | B | C
---|---|---
a1 | b1 | c1
a2 | b2 | c2`
        );
        done();
    });
});