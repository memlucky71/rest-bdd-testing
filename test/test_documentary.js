/**
 * Created by mohammad on 4/13/2019 AD.
 */

const fs = require('fs');
const chai = require('chai');

import Story from '../lib/story';


const expect = chai.expect;


describe('Test Documentary', function() {
    let docFilePath, data, expectedMarkdown;

    before(function() {
        docFilePath = `${__dirname}/temp/markdown2.md`;
        data = {
            baseCall: {
                title: 'Given Title',
                description: 'Given description',
                url: '/apiv1/books/:id/writers/:name',
                verb: 'GET',
                query: { fields: '[fullName,age]', sort: '-id' },
                urlParams: { id: '1', name: 'john' },
                json: { param1: 'value1', param2: 'value2' },
                headers: { a: 1 },
                response: {
                    url: '/apiv1/books/1/writers/john',
                    requestHeaders: {
                        a: '1',
                        host: '127.0.0.1:65320',
                        accept: 'application/json',
                        'content-type': 'application/json',
                        'content-length': '37',
                        connection: 'close'
                    },
                    query: { fields: '[fullName,age]', sort: '-id' }
                }
            },
            calls: [{
                title: 'Given When Title',
                json: { param1: 'value1', param2: 'value2', param3: 'value3' },
                headers: { a: 1, b: 2 },
                description: 'Given when description',
                response: {
                    url: '/apiv1/books/1/writers/john',
                    requestHeaders: {
                        a: '1',
                        b: '2',
                        host: '127.0.0.1:65320',
                        accept: 'application/json',
                        'content-type': 'application/json',
                        'content-length': '55',
                        connection: 'close'
                    },
                    query: { fields: '[fullName,age]', sort: '-id' }
                }
            }]
        };
        expectedMarkdown =
`# Given Title

# GET /apiv1/books/:id/writers/:name

Given description

# Url Parameters

Name | Example
---|---
id | 1
name | john

# Query Strings

Name | Example
---|---
fields | [fullName,age]
sort | -id

# Json

Name | Required | Type | Example
---|---|---|---
param1 | ? | ? | value1
param2 | ? | ? | value2

# Request Headers

* a: 1

---

# WHEN: Given When Title

# GET /apiv1/books/:id/writers/:name

Given when description

# Json

Name | Required | Type | Example
---|---|---|---
param1 | ? | ? | value1
param2 | ? | ? | value2
param3 | ? | ? | value3

# Request Headers

* a: 1
* b: 2`

    });

    after(function() {
        fs.unlinkSync(docFilePath);
    });

    it('Test a story', function(done) {
        let story = Story.fromJson(data);
        story.document(docFilePath);
        expect(fs.existsSync(docFilePath)).to.be.true;
        let docContent = fs.readFileSync(docFilePath, 'utf8');
        expect(docContent.trim()).to.be.equal(expectedMarkdown);
        done();
    });

});