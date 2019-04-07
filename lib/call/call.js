/**
 * Created by mohammad on 3/13/2019 AD.
 */
const URL = require('url');
const http = require('http');
const request = require('request-promise-native');


const URL_PARAMETER_PATTERN = /(?<key>\w+):\s?(?<value>[\w\d_-]+)/g;


class Call {
    constructor(title, description=null, response=null ) {
        this.title = title;
        this.description = description;
        this.response = response;

    }

    static destructureUrl(u) {
        let urlParams = {};
        let query = null;
        let parsedUrl = URL.parse(u, true);

        if(Object.entries(parsedUrl.query).length !== 0) {
            query = parsedUrl.query;
        }

        let url = decodeURIComponent(parsedUrl.pathname);

        let match = URL_PARAMETER_PATTERN.exec(url);
        let result = [];
        while (match) {
            result.push(match);
            match = URL_PARAMETER_PATTERN.exec(url);
        }

        if (result) {
            for (let matchedPairs of result) {
                let key = matchedPairs[1];
                let value = matchedPairs[2];

                urlParams[key] = value;
                url = url.replace(new RegExp(key + ':\\s?[\\w\\d_-]+'), `:${key}`);
            }
        }
        return {url, query, urlParams}
    }


    toJson() {
        let result = {title: this.title, description: this.description, url: this.url, verb: this.verb};

        if (Object.entries(this.query).length !== 0) result['query'] = this.query;
        if (Object.entries(this.urlParams).length !== 0) result['urlParams'] = this.urlParams;
        if (Object.entries(this.json).length !== 0) result['json'] = this.json;
        if (Object.entries(this.headers).length !== 0) result['headers'] = this.headers;
        if (Object.entries(this.response).length !== 0) result['response'] = this.response;

        return result;
    }

     invoke(app) {
        let url = this.url;

        if (Object.entries(this.urlParams).length !== 0) {
            for (const key of Object.keys(this.urlParams)) {
                url = url.replace(new RegExp(':' + key), `${this.urlParams[key]}`);
            }
        }

        let options = {
            uri: `http://${app.address().address}:${app.address().port || 80}${url}`,
            method: this.verb,
            qs: this.query,
            json: this.json,
            resolveWithFullResponse: true,
        };


        return new Promise((resolve, reject) => {
            request(options)
                .then(res => {
                    this.response = res.json || res.body;
                    resolve(this)
                })
                .catch(err => reject(err));
        });
    }
}

export default Call;