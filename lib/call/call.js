/**
 * Created by mohammad on 3/13/2019 AD.
 */
const URL = require('url');
const qs = require('querystring');
const http = require('http');
// const request = require('request');
var request = require('request-promise-native');


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

        if(parsedUrl.query) {
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
        return {
            title: this.title,
            description: this.description,
            url: this.url,
            verb: this.verb,
            query: this.query,
            urlParams: this.urlParams,
            json: this.json,
            headers: this.headers,
            response: this.response,
        }
    }

    async invoke(app) {
        let url = this.url;

        if (this.urlParams) {
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


        try {
            let res = await request(options);
            this.response = res.json || res.body;
            return this;
        }
        catch (err) {
            throw(err)
        }

        //     , function(e, res) {
        //     if (e) {
        //         throw('Something bad happened')
        //     }
        //
        //     this.response = res.json || res.body;
        //     return this.response;
        // });


    }
}

export default Call;