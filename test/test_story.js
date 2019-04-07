/**
 * Created by mohammad on 3/18/2019 AD.
 */

const chai = require('chai');

import {BaseCall, AlteredCall} from '../index';
import Story from '../lib/story';

const expect = chai.expect;


describe('Test Story', function() {
    let baseCall, alteredCall;

    before(function() {
        baseCall = new BaseCall('Hello world', 'It is description',
            {
                url: '/apiv1/books/id: 1/writers/name:john?fields=[fullName,age]&sort=-id',
                verb: 'GET',
                json: {param1: 'value1'},
                description: '',
                headers: {a: 1}
            });

        alteredCall = new AlteredCall(baseCall, 'Hello world again', 'It is a description again', {verb: 'POST'})


    });

    it('Test story toJson', function(done) {
        let story = new Story(baseCall, [alteredCall]);
        let result = story.toJson();

        expect(result).to.be.deep.equal({
            baseCall: {
                title: 'Hello world',
                description: 'It is description',
                url: '/apiv1/books/:id/writers/:name',
                verb: 'GET',
                query: {fields: '[fullName,age]', sort: '-id'},
                urlParams: {id: '1', name: 'john'},
                json: {param1: 'value1'},
                headers: {a: 1},
            },
            calls: [
                {
                    title: 'Hello world again',
                    verb: 'POST',
                    description: 'It is a description again',
                }
            ]
        });
        done();
    });

    it('Test story fromJson', function(done) {
        const data = {
            baseCall: {
                title: 'Hello world',
                description: 'It is description',
                url: '/apiv1/books/:id/writers/:name',
                verb: 'GET',
                query: {fields: '[fullName,age]', sort: '-id'},
                urlParams: {id: '1', name: 'john'},
                json: {param1: 'value1'},
                headers: {a: 1},
                response: {b: 2}
            },
            calls: [
                {
                    title: 'Hello world again',
                    verb: 'POST',
                    description: 'It is a description again',
                    response: {b: 3}
                }
            ]
        };

        let story = Story.fromJson(data);
        expect(story.toJson()).to.be.deep.equal(data);

        done();
    })

});