/**
 * Created by mohammad on 3/13/2019 AD.
 */

import Call from './call';


class BaseCall extends Call {
    _url = null;
    _query = null;
    _urlParams = null;

    constructor(title, description, {url='/', verb='GET', urlParams={}, json={}, headers={}, query={}, response={}}={}) {
        super(title, description, response);

        this.verb = verb;
        this.url = url;
        if (Object.entries(urlParams).length !== 0) {
            this.urlParams = urlParams;
        }
        if (Object.entries(query).length !== 0) this.query = query;
        this.json = json;
        this.headers = headers;
    }

    get query() {
        return this._query;
    }

    set query(value) {
        this._query = value;
    }

    get urlParams() {
        return this._urlParams;
    }

    set urlParams(value) {
        this._urlParams = value;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        let result = Call.destructureUrl(value);
        this._url = result.url;
        this.urlParams = result.urlParams;
        this.query = result.query;
    }

}

export default BaseCall;