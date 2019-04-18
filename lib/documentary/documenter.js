/**
 * Created by mohammad on 3/19/2019 AD.
 */

const _ = require('lodash');


class Documenter {
    constructor(formatterFactory, {fieldInfo=null}={}) {
        this.formatterFactory = formatterFactory;
        this.fieldInfo = fieldInfo;
    }

    writeResponse(response, formatter) {
        formatter.writeHeader(`Response: ${response.status}`, 3);
        let headers = {};
        let ignoreHeaders = ['content-type'];

        if (!_.isEmpty(response.headers)){
            for (const key of Object.keys(response.headers)) {
                if(!ignoreHeaders.includes(key.toLocaleLowerCase())) {
                    headers[key] = response.headers[key];
                }
            }

            if (!_.isEmpty(headers)) {
                formatter.writeHeader('Headers', 4);
                formatter.writeList(Object.keys(headers).map((key) => `${key}: ${headers[key]}`))
            }
        }

        if (!_.isEmpty(response.body)) {
            formatter.writeHeader('Body:', 4);
            formatter.writeParagraph(`Content-Type: ${response.contentType}`);
            let mim = '';

            if (response.contentType && response.contentType.includes('json')) {
                mim = 'json'
            }
            formatter.writeParagraph(`\`\`\`${mim}\n${response.body}\n\`\`\``);
        }


    }

    writeCall(baseCall, call, formatter) {
        formatter.writeHeader(`${call.verb} ${call.url}`, 3);

        if (call.description) {
            formatter.writeParagraph(call.description);
        }

        if (!_.isEmpty(call.urlParams) && ((baseCall === null) || (!_.isEqual(baseCall.urlParams, call.urlParams)))) {
            formatter.writeHeader('Url Parameters', 3);
            formatter.writeTable(_.toPairs(call.urlParams), {headers: ['Name', 'Example']});
        }

        if (!_.isEmpty(call.query) && ((baseCall === null) || (!_.isEqual(baseCall.query, call.query)))) {
            formatter.writeHeader('Query Strings', 3);
            formatter.writeTable(_.toPairs(call.query), {headers: ['Name', 'Example']});
        }

        if(!_.isEqual(call.json) && ((baseCall === null) || (!_.isEqual(baseCall.json, call.json)))) {
            formatter.writeHeader('Json', 3);
            let rows = [];

            for (let [key, value] of _.toPairs(call.json)) {
                let info = {};
                let required = '?';
                let type = '?';

                if (typeof this.fieldInfo === 'function') {
                    info = this.fieldInfo(call.url, call.verb, key);
                    if (info['required'] !== undefined) {
                        required = (info['required']) ? 'Yes' : 'No';
                    }
                    type = info['type']
                }

                rows.push([key, required, type, value])
            }

            formatter.writeTable(rows, {headers: ['Name', 'Required', 'Type', 'Example']})
        }

        if (!_.isEmpty(call.headers) && ((baseCall === null) || (!_.isEqual(baseCall.headers, call.headers)))) {
            formatter.writeHeader('Request Headers', 3);
            formatter.writeList(Object.keys(call.headers).map((key) => `${key}: ${call.headers[key]}`))
        }

        if(call.response) {
            this.writeResponse(call.response, formatter);
        }
    }

    document(story, outFile) {
        let baseCall = story.baseCall;
        let formatter = new this.formatterFactory(outFile);
        formatter.writeHeader(baseCall.title, 2);
        this.writeCall(null, baseCall, formatter);

        for (let call of story.calls) {
            formatter.writeParagraph('---');
            formatter.writeHeader(`WHEN: ${call.title}`, 2);
            this.writeCall(baseCall, call, formatter);
        }

    }
}

export default Documenter;

