/**
 * Created by mohammad on 3/21/2019 AD.
 */
const _ = require('lodash');


const CONTENT_TYPE_PATTERN = /(?<contentType>\w+\/\w+);?(\s?charset=(?<charset>[\w\d_-]+))?/g;


class Response {
    contentType;
    encoding;
    body;

    constructor(status, headers, {body=null, json=null}={}) {
        this.status = status;
        this.headers = headers;

        if (!_.isEmpty(json)) {
            this.body = JSON.stringify(json, null, 4);
        } else if (body) {
            this.body = body;
        }

        if (!_.isEmpty(headers)) {
            for (const key of Object.keys(headers)) {
                if (key.toLowerCase() === 'content-type'){
                    CONTENT_TYPE_PATTERN.lastIndex = 0;
                    let matches = CONTENT_TYPE_PATTERN.exec(headers[key]);
                    this.contentType = matches.groups.contentType;
                    this.encoding = matches.groups.charset;
                }
            }
        }
    }

    get json() {
        return JSON.parse(this.body);
    }

    toJson() {
        let result = {'status': this.status};

        if (!_.isEmpty(this.headers)) {
            result['headers'] = this.headers;
        }

        if (this.body) {

            if (this.contentType === 'application/json') {
                result['json'] = this.json;
            } else {
                result['body'] = this.body;
            }
        }
        return result;
    }
}

export default Response;