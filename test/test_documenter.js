/**
 * Created by mohammad on 3/14/2019 AD.
 */

const chai = require('chai');
const fs = require('fs');
const http = require('http');
const URL = require('url');

import BaseCall from '../lib/call/base_call';
import AlteredCall from '../lib/call/altered_call';

const expect = chai.expect;


describe('Testing Calls specifications', function () {

    let baseCall, app;

    before(function(){
        app = http.createServer((req, res) => {
            let parsedUrl = URL.parse(req.url,true);
            let result = {'url': parsedUrl.pathname};

            if (parsedUrl.query) {
                result['query'] = parsedUrl.query;
            }
            res.end(JSON.stringify(result));
            // res.end();
        }).listen(0,'localhost');



        baseCall = new BaseCall('Hello world', 'It is description',
            {
                url: '/apiv1/books/id: 1/writers/name:john?fields=[fullName,age]&sort=-id',
                verb: 'GET',
                json: {param1: 'value1'},
                description: '',
                headers: {a: 1}
            });
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
            response: {}
        });

        try {
            baseCall = await baseCall.invoke(app);

            expect(baseCall.toJson()).to.deep.equal({
                title: 'Hello world',
                description: 'It is description',
                url: '/apiv1/books/:id/writers/:name',
                verb: 'GET',
                query: { fields: '[fullName,age]', sort: '-id' },
                urlParams: { id: '1', name: 'john' },
                json: { param1: 'value1' },
                headers: { a: 1 },

                response: {
                    url: '/apiv1/books/1/writers/john',
                    query: { fields: '[fullName,age]', sort: '-id' }
                }
            });
        }
        catch (err) {
            expect(false).to.be.true;
        }

    });


    it('Test altered call when changing verb', function(done) {

        let alteredCall = new AlteredCall(baseCall, 'Hello world again', 'It is a description again', {verb: 'POST'});
        let result = alteredCall.toJson();

        expect(result).to.deep.equal({
            title: 'Hello world again',
            description: 'It is a description again',
            verb: 'POST',
            response: {}
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
            response: {}
        });
        done();
    });



});