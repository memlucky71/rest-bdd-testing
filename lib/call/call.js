/**
 * Created by mohammad on 3/13/2019 AD.
 */
const URL = require('url');
const http = require('http');
const request = require('request-promise-native');
const _ = require('lodash');

import Response from '../reponse';


const URL_PARAMETER_PATTERN = /(?<key>\w+):\s?(?<value>[\w\d_-]+)/g;


class Call {
    response;

    constructor(title, description=null, response=null ) {
        this.title = title;
        this.description = description;
        if (response && typeof response === 'object') {
            this.response = new Response(response.status, response.headers, {body:response.body || null, json: response.json || null})
        } else {
            this.response = response;
        }

    }

    static destructureUrl(u) {
        let urlParams = {};
        let query = null;
        let parsedUrl = URL.parse(u, true);

        if(!_.isEmpty(parsedUrl.query)) {
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

        if (!_.isEmpty(this.query)) result['query'] = this.query;
        if (!_.isEmpty(this.urlParams)) result['urlParams'] = this.urlParams;
        if (!_.isEmpty(this.json)) result['json'] = this.json;
        if (!_.isEmpty(this.headers)) result['headers'] = this.headers;
        if (this.response) result['response'] = this.response.toJson();

        return result;
    }

     invoke(app) {
        let url = this.url;

        if (!_.isEmpty(this.urlParams)) {
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
            headers: this.headers,
        };


        return new Promise((resolve, reject) => {
            request(options)
                .then(res => {
                    let body = res.body;

                    if (body && typeof body === 'object'){
                        body = JSON.stringify(body, null, 4);
                    }
                    this.response = new Response(res.statusCode, res.headers, {body:body, json: res.json});
                    resolve(this);
                })
                .catch(err => {
                    let res = err.response;
                    let body = res.body;

                    if (body && typeof body === 'object'){
                        body = JSON.stringify(body, null, 4);
                    }
                    this.response = new Response(res.statusCode, res.headers, {body:body, json: res.json});
                    resolve(this);
                });
        });
    }
}

export default Call;