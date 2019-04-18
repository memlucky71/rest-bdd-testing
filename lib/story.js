/**
 * Created by mohammad on 3/18/2019 AD.
 */

const fs = require('fs');

import BaseCall from './call/base_call';
import AlteredCall from './call/altered_call';
import Documenter from './documentary/documenter';
import MarkdownFormatter from './documentary/formatter/markdown';

class Story {
    constructor(baseCall, calls=[]) {
        this.baseCall = baseCall;
        this.calls = calls;
    }

    get title() {
        return this.baseCall.title;
    }

    toJson() {
        let result = {baseCall: this.baseCall.toJson(), calls: []};
        for (let call of this.calls) {
            result.calls.push(call.toJson());
        }
        return result;
    }

    static fromJson(data) {
        let {title, description, ...rest} = data.baseCall;
        let baseCall = new BaseCall(title, description, rest);

        let calls=[];
        for (let call of data.calls) {
            let {title, description, ...rest} = call;
            calls.push(new AlteredCall(baseCall, title, description, rest));
        }
        return new Story(baseCall, calls);
    }

    dump(outfile) {
        try {
            fs.writeSync(outfile, JSON.stringify(this.toJson(), null, 4));
        } catch (err) {
            /* Handle the error */
            throw err;
        }
    }

    document(outfile, {formatterFactory=MarkdownFormatter, fieldInfo}={}) {
        let documenter = new Documenter(formatterFactory, {fieldInfo: fieldInfo});
        documenter.document(this, outfile);
    }


}

export default Story;