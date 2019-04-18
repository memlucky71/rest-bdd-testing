/**
 * Created by mohammad on 3/14/2019 AD.
 */

const chai = require('chai');
const fs = require('fs');
const http = require('http');
const URL = require('url');
const chaiSubset = require('chai-subset');

import BaseCall from '../lib/call/base_call';
import AlteredCall from '../lib/call/altered_call';


const expect = chai.expect;
chai.use(chaiSubset);


describe('Testing Calls specifications', function () {

    let baseCall, app;

    before(function(done){
        app = http.createServer((req, res) => {
            let parsedUrl = URL.parse(req.url,true);

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

        }).listen(0,'localhost', done);



        baseCall = new BaseCall('Hello world', 'It is description',
            {
                url: '/apiv1/books/id: 1/writers/name:john?fields=[fullName,age]&sort=-id',
                verb: 'GET',
                json: {param1: 'value1'},
                headers: {a: 1}
            });
    });

    after(function(done) {
        app.close(done);
    });


    it('Test base call', async function() {
        let result = baseCall.toJson();

        expect(result).to.deep.equal({
            title: 'Hello world',
            description: 'It is description',
            url: '/apiv1/books/:id/writers/:name',
            verb: 'GET',
            query: { fields: '[fullName,age]', sort: '-id' },
            urlParams: { id: '1', name: 'john' },
            json: { param1: 'value1' },
            headers: { a: 1 },
        });

        baseCall = await baseCall.invoke(app);

        expect(baseCall.toJson()).to.containSubset({
            title: 'Hello world',
            description: 'It is description',
            url: '/apiv1/books/:id/writers/:name',
            verb: 'GET',
            query: { fields: '[fullName,age]', sort: '-id' },
            urlParams: { id: '1', name: 'john' },
            json: { param1: 'value1' },
            headers: { a: 1 },

            response: {
                status: 200,
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'content-length': '243'
                },
                json: {
                    url: '/apiv1/books/1/writers/john',
                    query: { fields: '[fullName,age]', sort: '-id' },
                    requestHeaders: {a: "1"}
                }
            }
        });

    });


    it('Test altered call when changing verb', function(done) {

        let alteredCall = new AlteredCall(baseCall, 'Hello world again', 'It is a description again', {verb: 'POST'});
        let result = alteredCall.toJson();

        expect(result).to.deep.equal({
            title: 'Hello world again',
            description: 'It is a description again',
            verb: 'POST',
        });
        done();
    });

    it('Test altered call when changing url param', function(done) {
        let alteredCall = new AlteredCall(
            baseCall, 'Hello world again', 'It is a description again', {urlParams: {id: 2}});
        let result = alteredCall.toJson();

        expect(baseCall.urlParams).to.deep.equal({id: '1', name: 'john'});
        expect(alteredCall.urlParams).to.deep.equal({id: 2});

        expect(result).to.deep.equal({
            title: 'Hello world again',
            description: 'It is a description again',
            urlParams: {id: 2},
        });
        done();
    });

    it('Test response with error', async function() {
        let baseCall = new BaseCall('Error in response', 'It is description',
            {
                url: '/error/in/response',
                verb: 'GET',
            });

        baseCall = await baseCall.invoke(app);
        expect(baseCall.response.toJson()).to.containSubset({
            status: 404,
            body: 'This should be an Error'
        });
    })



});