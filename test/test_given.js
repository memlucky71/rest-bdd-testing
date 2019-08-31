/**
 * Created by mohammad on 4/11/2019 AD.
 */

const fs = require('fs');
const http = require('http');
const chai = require('chai');
const URL = require('url');
const chaiSubset = require('chai-subset');

// import Given from '../lib/given';
import {Given, Update, Append, Remove} from '../lib';

const expect = chai.expect;
chai.use(chaiSubset);


describe('Test given', function() {
    let docFilePath, dumpFilePath, given, app, expectedMarkdown, expectedJson;


    before(function(done){
        docFilePath = `${__dirname}/temp/markdown3.md`;
        dumpFilePath = `${__dirname}/temp/markdown3.json`;

        expectedMarkdown =
`## Given Title

### GET /apiv1/books/:id/writers/:name

Given description

### Url Parameters

Name | Example
---|---
id | 1
name | john

### Query Strings

Name | Example
---|---
fields | [fullName,age]
sort | -id

### Json

Name | Required | Type | Example
---|---|---|---
param1 | ? | ? | value1
param2 | ? | ? | value2

### Request Headers

* a: 1

### Response: 200

#### Headers

* connection: close
* content-length: 218

#### Body:

Content-Type: application/json

\`\`\`json
{
    "url": "/apiv1/books/1/writers/john",
    "requestHeaders": {
        "a": "1",
        "accept": "application/json",
        "content-type": "application/json",
        "content-length": "37",
        "connection": "close"
    },
    "query": {
        "fields": "[fullName,age]",
        "sort": "-id"
    }
}
\`\`\`

---

## WHEN: Given When Title

### GET /apiv1/books/:id/writers/:name

Given when description

### Json

Name | Required | Type | Example
---|---|---|---
newParam | ? | ? | new param

### Response: 200

#### Headers

* connection: close
* content-length: 218

#### Body:

Content-Type: application/json

\`\`\`json
{
    "url": "/apiv1/books/1/writers/john",
    "requestHeaders": {
        "a": "1",
        "accept": "application/json",
        "content-type": "application/json",
        "content-length": "24",
        "connection": "close"
    },
    "query": {
        "fields": "[fullName,age]",
        "sort": "-id"
    }
}
\`\`\`

---

## WHEN: Given When Title

### GET /apiv1/books/:id/writers/:name

Given when description

### Query Strings

Name | Example
---|---
fields | [fullName,age]
sort | id

### Json

Name | Required | Type | Example
---|---|---|---
param1 | ? | ? | new value
param2 | ? | ? | value2

### Request Headers

* a: 2

### Response: 200

#### Headers

* connection: close
* content-length: 217

#### Body:

Content-Type: application/json

\`\`\`json
{
    "url": "/apiv1/books/1/writers/john",
    "requestHeaders": {
        "a": "2",
        "accept": "application/json",
        "content-type": "application/json",
        "content-length": "40",
        "connection": "close"
    },
    "query": {
        "fields": "[fullName,age]",
        "sort": "id"
    }
}
\`\`\`

---

## WHEN: Given When Title

### GET /apiv1/books/:id/writers/:name

Given when description

### Json

Name | Required | Type | Example
---|---|---|---
param1 | ? | ? | value1
param2 | ? | ? | value2
param3 | ? | ? | value3

### Request Headers

* a: 1
* b: 2

### Response: 200

#### Headers

* connection: close
* content-length: 226

#### Body:

Content-Type: application/json

\`\`\`json
{
    "url": "/apiv1/books/1/writers/john",
    "requestHeaders": {
        "a": "1",
        "b": "2",
        "accept": "application/json",
        "content-type": "application/json",
        "content-length": "55",
        "connection": "close"
    },
    "query": {
        "fields": "[fullName,age]",
        "sort": "-id"
    }
}
\`\`\`

---

## WHEN: Given When Title

### GET /apiv1/books/:id/writers/:name

Given when description

### Json

Name | Required | Type | Example
---|---|---|---
param2 | ? | ? | value2

### Response: 200

#### Headers

* connection: close
* content-length: 210

#### Body:

Content-Type: application/json

\`\`\`json
{
    "url": "/apiv1/books/1/writers/john",
    "requestHeaders": {
        "accept": "application/json",
        "content-type": "application/json",
        "content-length": "19",
        "connection": "close"
    },
    "query": {
        "fields": "[fullName,age]",
        "sort": "-id"
    }
}
\`\`\`

---

## WHEN: Given When Title

### GET /error/in/response

Given when description

### Response: 404

#### Headers

* connection: close
* transfer-encoding: chunked

#### Body:

Content-Type: text/plain

\`\`\`
This should be an Error
\`\`\``;

        expectedJson =
            `{
    "baseCall": {
        "title": "Given Title",
        "description": "Given description",
        "url": "/apiv1/books/:id/writers/:name",
        "verb": "GET",
        "query": {
            "fields": "[fullName,age]",
            "sort": "-id"
        },
        "urlParams": {
            "id": "1",
            "name": "john"
        },
        "json": {
            "param1": "value1",
            "param2": "value2"
        },
        "headers": {
            "a": 1
        },
        "response": {
            "status": 200,
            "headers": {
                "content-type": "application/json; charset=utf-8",
                "connection": "close",
                "content-length": "218"
            },
            "json": {
                "url": "/apiv1/books/1/writers/john",
                "requestHeaders": {
                    "a": "1",
                    "accept": "application/json",
                    "content-type": "application/json",
                    "content-length": "37",
                    "connection": "close"
                },
                "query": {
                    "fields": "[fullName,age]",
                    "sort": "-id"
                }
            }
        }
    },
    "calls": [
        {
            "title": "Given When Title",
            "query": {
                "fields": "[fullName,age]",
                "sort": "id"
            },
            "json": {
                "newParam": "new param"
            },
            "description": "Given when description",
            "response": {
                "status": 200,
                "headers": {
                    "content-type": "application/json; charset=utf-8",
                    "connection": "close",
                    "content-length": "218"
                },
                "json": {
                    "url": "/apiv1/books/1/writers/john",
                    "requestHeaders": {
                        "a": "1",
                        "accept": "application/json",
                        "content-type": "application/json",
                        "content-length": "24",
                        "connection": "close"
                    },
                    "query": {
                        "fields": "[fullName,age]",
                        "sort": "id"
                    }
                }
            }
        },
        {
            "title": "Given When Title",

            "json": {
                "param1": "new value",
                "param2": "value2"
            },
            "headers": {
                "a": 2
            },
            "description": "Given when description",
            "response": {
                "status": 200,
                "headers": {
                    "content-type": "application/json; charset=utf-8",
                    "connection": "close",
                    "content-length": "218"
                },
                "json": {
                    "url": "/apiv1/books/1/writers/john",
                    "requestHeaders": {
                        "a": "2",
                        "accept": "application/json",
                        "content-type": "application/json",
                        "content-length": "40",
                        "connection": "close"
                    },
                    "query": {
                        "fields": "[fullName,age]",
                        "sort": "-id"
                    }
                }
            }
        },
        {
            "title": "Given When Title",
            "json": {
                "param1": "value1",
                "param2": "value2",
                "param3": "value3"
            },
            "headers": {
                "a": 1,
                "b": 2
            },
            "description": "Given when description",
            "response": {
                "status": 200,
                "headers": {
                    "content-type": "application/json; charset=utf-8",
                    "connection": "close",
                    "content-length": "226"
                },
                "json": {
                    "url": "/apiv1/books/1/writers/john",
                    "requestHeaders": {
                        "a": "1",
                        "b": "2",
                        "accept": "application/json",
                        "content-type": "application/json",
                        "content-length": "55",
                        "connection": "close"
                    },
                    "query": {
                        "fields": "[fullName,age]",
                        "sort": "-id"
                    }
                }
            }
        },
        {
            "title": "Given When Title",
            "json": {
                "param2": "value2"
            },
            "headers": {},
            "description": "Given when description",
            "response": {
                "status": 200,
                "headers": {
                    "content-type": "application/json; charset=utf-8",
                    "connection": "close",
                    "content-length": "210"
                },
                "json": {
                    "url": "/apiv1/books/1/writers/john",
                    "requestHeaders": {
                        "accept": "application/json",
                        "content-type": "application/json",
                        "content-length": "19",
                        "connection": "close"
                    },
                    "query": {
                        "fields": "[fullName,age]",
                        "sort": "-id"
                    }
                }
            }
        },
        {
            "title": "Given When Title",
            "url": "/error/in/response",
            "urlParams": {},
            "query": null,
            "description": "Given when description",
            "response": {
                "status": 404,
                "headers": {
                    "content-type": "text/plain",
                    "connection": "close",
                    "transfer-encoding": "chunked"
                },
                "body": "This should be an Error"
            }
        }
    ]
}`;

        app = http.createServer((req, res) => {
            res.removeHeader('date');
            delete req.headers['host'];
            let parsedUrl = URL.parse(req.url,true);

            if (parsedUrl.pathname !== '/error/in/response') {
                let result = {'url': parsedUrl.pathname, 'requestHeaders': req.headers};

                if (parsedUrl.query) {
                    result['query'] = parsedUrl.query;
                }
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end(JSON.stringify(result));
            } else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('This should be an Error');
            }


        }).listen(0,'localhost', done);
    });


    after(function(done) {
        fs.unlinkSync(docFilePath);
        fs.unlinkSync(dumpFilePath);
        app.close(done);
    });


    it('Initializing given', function(done) {
        given = new Given(app, 'Given Title', 'Given description', {
            autodump: dumpFilePath,
            autodoc: docFilePath,
            url: '/apiv1/books/id: 1/writers/name:john?fields=[fullName,age]&sort=-id',
            verb: 'GET',
            json: {param1: 'value1', param2: 'value2'},
            headers: {a: 1}
        });

        expect(given.baseCall.toJson()).to.deep.equal({
            title: 'Given Title',
            description: 'Given description',
            url: '/apiv1/books/:id/writers/:name',
            verb: 'GET',
            query: { fields: '[fullName,age]', sort: '-id' },
            urlParams: { id: '1', name: 'john' },
            json: {param1: 'value1', param2: 'value2'},
            headers: { a: 1 },
        });
        done();
    });

    it('Request base call', async function(){
       let baseCall = await given.requestBaseCall();

        expect(baseCall.toJson().response).to.containSubset({
            status: 200,
            json: {
                url: '/apiv1/books/1/writers/john',
                query: { fields: '[fullName,age]', sort: '-id' },
                requestHeaders: {a: "1"}
            },
            headers: {
                "content-length": "218",
                "content-type": "application/json; charset=utf-8"
            }
        });

    });

    it('Test given when', async function() {
        let newCall = await given.when('Given When Title', 'Given when description', {
            json: {newParam: 'new param'}
        });
        expect(newCall.toJson()).to.containSubset({
            title: 'Given When Title',
            json: {newParam: 'new param'}
        })
    });

    it('Test given when, update manipulator', async function() {
        let newCall = await given.when('Given When Title', 'Given when description', {
            json: new Update({param1: 'new value'}),
            headers: new Update({a: 2}),
            query: new Update({sort: 'id'})
        });

        expect(newCall.toJson()).to.containSubset({
            title: 'Given When Title',
            json: {param1: 'new value', param2: 'value2'},
            headers: {a: 2},
            query: {fields: '[fullName,age]', sort: 'id'}
        });

        expect(given.when.bind(given, 'Given When Title', 'Given when description', {json: new Update({param3: 'new value'})}))
            .to.throw('The key param3 is not in target container');

    });

    it('Test given when, append manipulator', async function() {
        let newCall = await given.when('Given When Title', 'Given when description', {
            json: new Append({param3: 'value3'}),
            headers: new Append({b: 2})
        });

        expect(newCall.toJson()).to.containSubset({
            title: 'Given When Title',
            json: {param1: 'value1', param2: 'value2', param3: 'value3'},
            headers: {a: 1, b: 2},
        });

        expect(given.when.bind(given, 'Given When Title', 'Given when description', {json: new Append({param1: 'new value'})}))
            .to.throw('The key param1 is already exists in target container');
    });

    it('Test given when, remove manipulator', async function() {
        let newCall = await given.when('Given When Title', 'Given when description', {
            json: new Remove(['param1']),
            headers: new Remove(['a'])
        });

        expect(newCall.toJson()).to.containSubset({
            title: 'Given When Title',
            json: {param2: 'value2'},
            headers: {},
        });

        expect(given.when.bind(given, 'Given When Title', 'Given when description', {json: new Remove(['param3'])}))
            .to.throw('Target container has no key param3');
    });

    it('Test given when, wrong url, error in response', async function() {
        let newCall = await given.when('Given When Title', 'Given when description', {
            url: '/error/in/response'
        });

    });

    it('Test given documentation', function(done) {
        given.end();
        expect(fs.existsSync(docFilePath)).to.be.true;
        expect(fs.existsSync(dumpFilePath)).to.be.true;
        let docContent = fs.readFileSync(docFilePath, 'utf8');
        let dumpContent = fs.readFileSync(dumpFilePath, 'utf8');
        expect(docContent.trim()).to.be.equal(expectedMarkdown);
        expect(dumpContent.trim()).to.be.equal(expectedJson);
        done()
    })

});