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
            formatter.writeTable(_.toPairs(call.urlParams), {headers: ['Name', 'Example']});
        }

        if (!_.isEmpty(call.headers) && ((baseCall === null)||(!_.isEqual(baseCall.headers, call.headers)))) {
            formatter.writeHeader('Request Headers', 3);
            formatter.writeList(Object.keys(call.headers).map((key) => `${key}: ${call.headers[key]}`))
        }

        //TODO: Add response
    }

    document(story, outFile) {
        let baseCall = story.baseCall;
        let formatter = this.formatterFactory(outFile);
        formatter.writeHeader(baseCall.title, 2);
        this.writeCall(null, baseCall, formatter);

        for (let call of story.calls) {
            formatter.writeParagraph('---');
            formatter.writeHeader(`WHEN: ${call.title}`, 2);
            this.writeCall(baseCall, call, formatter);
        }

    }

}
