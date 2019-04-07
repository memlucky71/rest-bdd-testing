/**
 * Created by mohammad on 3/30/2019 AD.
 */
const http = require('http');
const request = require('request-promise-native');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const URL = require('url');

import Response from '../lib/reponse';


const expect = chai.expect;
chai.use(chaiSubset);


describe('Testing response', function() {
    let app, host;

    before(function (done) {
        app = http.createServer((req, res) => {
            let parsedUrl = URL.parse(req.url,true);

            if (parsedUrl.pathname === '/apiv1/response/json') {
                let result = {'result': 'it is json response'};
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end(JSON.stringify(result));

            } else if (parsedUrl.pathname === '/apiv1/response/text') {
                res.setHeader('Content-Type', 'text/plain');
                res.end('This is plain text response');

            } else if (parsedUrl.pathname === '/apiv1/response/empty') {
                res.end()
            }

        }).listen(0,'localhost',() => {
            host = `http://${app.address().address}:${app.address().port || 80}`;
            done()
        });
    });

    after(function(done) {
        app.close(done);
    });

    it('Response with json', async function() {
        let options = {
            uri: `${host}/apiv1/response/json`,
            method: 'GET',
            resolveWithFullResponse: true,
        };

        let response = await request(options);

        let responseObject = new Response(response.statusCode, response.headers, {body: response.body});
        expect(responseObject.toJson()).to.containSubset({
            status: 200,
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'content-length': '32',
                connection: 'close'
            },
            json: { result: 'it is json response' }
        });

    });

    it('Response with plain text', async function() {
        let options = {
            uri: `${host}/apiv1/response/text`,
            method: 'GET',
            resolveWithFullResponse: true,
        };

        let response = await request(options);

        let responseObject = new Response(response.statusCode, response.headers, {body: response.body});
        expect(responseObject.toJson()).to.containSubset({
            status: 200,
            headers: {
                'content-type': 'text/plain',
                'content-length': '27',
                connection: 'close'
            },
            body: 'This is plain text response'
        });
    });

    it('Empty response', async function() {
        let options = {
            uri: `${host}/apiv1/response/empty`,
            method: 'GET',
            resolveWithFullResponse: true,
        };

        let response = await request(options);

        let responseObject = new Response(response.statusCode, response.headers, {body: response.body});
        expect(responseObject.toJson()).to.containSubset({
            status: 200,
            headers: {
                'content-length': '0',
                connection: 'close'
            }
        });
    });


});