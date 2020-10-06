/**
 * Created by fatemeh on 10/4/2020 AD.
 */

const http = require('http');
const URL = require('url');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const {describe, before, after} = require('mocha');

import BaseCall from '../lib/call/base_call';

const expect = chai.expect;
chai.use(chaiSubset);


describe('Testing Nestjs Application', function () {

    let baseCall, app;

    before(function (done) {
        app = http.createServer((req, res) => {
            let parsedUrl = URL.parse(req.url, true);

            if (parsedUrl.pathname === '/error/in/response') {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('This should be an Error');
            } else {
                let result = {'url': parsedUrl.pathname, 'requestHeaders': req.headers};

                if (parsedUrl.query) {
                    result['query'] = parsedUrl.query;
                }
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end(JSON.stringify(result));
            }

        }).listen(0, 'localhost', done);

        baseCall = new BaseCall('Hello world', 'It is description',
            {
                url: '/apiv1/books/',
                verb: 'GET',
                json: {param1: 'value1'},
                headers: {a: 1}
            });
    });

    after(function (done) {
        app.close(done);
    });

    it('Test base call', async function () {
        const address = app.address().address;
        const port = app.address().port;
        app.getUrl = async () => {
            return `http://${address}:${port}`;
        };
        app.address = () => {
            return undefined
        };

        baseCall = await baseCall.invoke(app);

        expect(baseCall.toJson()).to.containSubset({
            response: {
                status: 200,
                headers: {
                    'content-type': 'application/json; charset=utf-8'
                },
                json: {
                    url: '/apiv1/books/',
                    requestHeaders: {a: "1"}
                }
            }
        });

    });
});