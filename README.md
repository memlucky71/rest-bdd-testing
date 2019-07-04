# rest-bdd-testing

Toolchain for testing REST API, in BDD style.

![npm](https://img.shields.io/npm/v/rest-bdd-testing.svg)
[![Build Status](https://travis-ci.com/memlucky71/rest-bdd-testing.svg?branch=master)](https://travis-ci.com/memlucky71/rest-bdd-testing)
[![Coverage Status](https://coveralls.io/repos/github/memlucky71/rest-bdd-testing/badge.svg?branch=coveralls)](https://coveralls.io/github/memlucky71/rest-bdd-testing?branch=master)


## Installation


`rest-bdd-testing` is available on [npm](http://npmjs.org). To install it, type:

    $ npm install rest-bdd-testing

    
## Usage
Here is sample usage of this package with mocha.

```js
const http = require('http');
const URL = require('url');
const assert = require('assert');

import {Given, Update} from 'rest-bdd-testing';

describe('Simple usage of REST BDD Tesing in mocha', function() {
    let app, given;

    before(function(done) {
        app = http.createServer((req, res) => {
            let parsedUrl = URL.parse(req.url,true);

            if (parsedUrl.pathname.endsWith('null')) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('404 Not found');
            } else {
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                res.end(JSON.stringify({
                    foo: 'bar'
                }));
            }

        }).listen(done);
    });

    after(function(done) {
        given.end();
        app.close(done);
    });

    it('Happy Scenario', async function() {
        given = new Given(app, 'Happy Scenario', 'When name is  provided, result should be caught.', {
            autodump: './given.json',
            autodoc: './given.md',
            url: '/books/id: 1/writers/name:john?fields=[fullName,age]&sort=-id',
            verb: 'GET',
        });

        let fulfilledRequest = await given.requestBaseCall();
        assert.deepStrictEqual(fulfilledRequest.response.status, 200);
    });

    it('Unhappy Scenario', async function() {
        let newFulfilledRequest = await given.when('Name is null', 'The name url parameter is null', {
            urlParams: new Update({'name': null})
        });

        assert.deepStrictEqual(newFulfilledRequest.response.status, 404);
    });

});

```

If ``autodump`` or ``autodoc`` presents, the ``given.end()`` creates 2 files for dumping and documenting given(story); 

## Dumping Story
The `json` file for above story:
```json
{
    "baseCall": {
        "title": "Happy Scenario",
        "description": "When name is  provided, result should be caught.",
        "url": "/books/:id/writers/:name",
        "verb": "GET",
        "query": {
            "fields": "[fullName,age]",
            "sort": "-id"
        },
        "urlParams": {
            "id": "1",
            "name": "john"
        },
        "response": {
            "status": 200,
            "headers": {
                "content-type": "application/json;charset=utf-8",
                "date": "Thu, 18 Apr 2019 21:25:41 GMT",
                "connection": "close",
                "content-length": "13"
            },
            "json": {
                "foo": "bar"
            }
        }
    },
    "calls": [
        {
            "title": "Name is null",
            "urlParams": {
                "id": "1",
                "name": null
            },
            "description": "The name url parameter is null",
            "response": {
                "status": 404,
                "headers": {
                    "content-type": "text/plain",
                    "date": "Thu, 18 Apr 2019 21:25:41 GMT",
                    "connection": "close",
                    "transfer-encoding": "chunked"
                },
                "body": "404 Not found"
            }
        }
    ]
}

```


## Documenting Story
The `md` file for above story:


    ## Happy Scenario
    
    ### GET /books/:id/writers/:name
    
    When name is  provided, result should be caught.
    
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
    
    ### Response: 200
    
    #### Headers
    
    * date: Thu, 18 Apr 2019 21:55:43 GMT
    * connection: close
    * content-length: 13
    
    #### Body:
    
    Content-Type: application/json
    
    ```json
    {
        "foo": "bar"
    }
    ```
    
    ---
    
    ## WHEN: Name is null
    
    ### GET /books/:id/writers/:name
    
    The name url parameter is null
    
    ### Url Parameters
    
    Name | Example
    ---|---
    id | 1
    name | 
    
    ### Response: 404
    
    #### Headers
    
    * date: Thu, 18 Apr 2019 21:55:43 GMT
    * connection: close
    * transfer-encoding: chunked
    
    #### Body:
    
    Content-Type: text/plain
    
    ```
    404 Not found
    ```