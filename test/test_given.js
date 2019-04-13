/**
 * Created by mohammad on 4/11/2019 AD.
 */

const http = require('http');
const chai = require('chai');
const URL = require('url');
const chaiSubset = require('chai-subset');

import Given from '../lib/given';
import {Update, Append, Remove} from '../lib/manipulation';

const expect = chai.expect;
chai.use(chaiSubset);


describe('Test given', function() {
    let given, app;


    before(function(done){
        app = http.createServer((req, res) => {
            let parsedUrl = URL.parse(req.url,true);
            let result = {'url': parsedUrl.pathname, 'requestHeaders': req.headers};

            if (parsedUrl.query) {
                result['query'] = parsedUrl.query;
            }
            res.end(JSON.stringify(result));

        }).listen(0,'localhost', done);
    });


    after(function(done) {
        app.close(done);
    });


    it('Initializing given', function(done) {
        given = new Given(app, 'Given Title', 'Given description', {
            autodump: false,
            url: '/apiv1/books/id: 1/writers/name:john?fields=[fullName,age]&sort=-id',
            verb: 'GET',
            json: {param1: 'value1', param2: 'value2'},
            headers: {a: 1}
        });

        expect(given.autodump).to.be.false;
        expect(given.autodoc).to.be.true;
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
            url: '/apiv1/books/1/writers/john',
            query: { fields: '[fullName,age]', sort: '-id' },
            requestHeaders: {a: "1"}
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
            headers: new Update({a: 2})
        });

        expect(newCall.toJson()).to.containSubset({
            title: 'Given When Title',
            json: {param1: 'new value', param2: 'value2'},
            headers: {a: 2},
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

});