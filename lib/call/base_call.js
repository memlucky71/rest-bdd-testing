/**
 * Created by mohammad on 3/13/2019 AD.
 */

import Call from './call';


class BaseCall extends Call {
    _url = null;

    constructor(title, description, {url='/', verb='GET', urlParams={}, json={}, headers={}, query={}, response={}}={}) {
        super(title, description, response);
        this.verb = verb;
        this.urlParams = urlParams;
        this.url = url;
        this.query = query;
        this.url = url;
        this.json = json;
        this.headers = headers;
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