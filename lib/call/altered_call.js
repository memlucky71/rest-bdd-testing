/**
 * Created by mohammad on 3/13/2019 AD.
 */

const _ = require('lodash');

import Call from './call';


class Unchanged {constructor(){this.temp='temp'}}


const UNCHANGED = new Unchanged();


class AlteredCall extends Call {
    constructor(baseCall, title, description, {url=UNCHANGED, verb=UNCHANGED, urlParams=UNCHANGED, json=UNCHANGED,
        headers=UNCHANGED, query=UNCHANGED, response={}}={}) {
        super(title, description, response);

        this.baseCall = baseCall;
        this.diff = {};
        this.url = url;

        if (!(urlParams instanceof Unchanged)){
            this.urlParams = urlParams;
        }

        if (!(query instanceof Unchanged)) {
            this.query = query;
        }

        this.verb = verb;
        this.json = json;
        this.headers = headers;
    }

    toJson() {
        let result = {title: this.title};
        result = {...result, ...this.diff};

        if(this.description){
            result['description'] = this.description;
        }

        if(!_.isEmpty(this.response)){
            result['response'] = this.response;
        }

        return result
    }

    updateDiff(key, value) {
        if (value instanceof Unchanged) {
            delete this.diff[key];
            return
        }
        this.diff[key] = value;
    }

    get url() {
        return this.diff['url'] || this.baseCall.url;
    }

    set url(value) {
        if (value instanceof Unchanged) {
            delete this.diff['url'];
            return
        }

        let {url, urlParams, query} = Call.destructureUrl(value);
        if (url && (url != this.baseCall.url)) {
            this.diff['url'] = url;
            this.urlParams = urlParams;
            this.query = query;
        }

    }

    get urlParams() {
        return this.diff.urlParams || this.baseCall.urlParams;
    }

    set urlParams(value) {
        this.updateDiff('urlParams', value);
    }

    deleteUrlParams() {
        delete this.diff.urlParams;
    }

    get verb() {
        return this.diff.verb || this.baseCall.verb;
    }

    set verb(value) {
        this.updateDiff('verb', value);
    }

    deleteVerb(value) {
        delete this.diff.verb;
    }

    get headers() {
        return this.diff.headers || this.baseCall.headers;
    }

    set headers(value) {
        this.updateDiff('headers', value)
    }

    deleteHeaders() {
        delete this.diff.headers;
    }

    get query() {
        return this.diff.query || this.baseCall.query;
    }

    set query(value) {
        this.updateDiff('query', value instanceof Unchanged ? value : Call.normalizeQueryString(value))
    }

    deleteQuery(value) {
        return this.diff.query;
    }

    get json() {
        return this.diff.json || this.baseCall.json;
    }

    set json(value) {
        this.updateDiff('json', value);
    }

    deleteJson() {
        delete this.diff.json;
    }
}

export default AlteredCall;