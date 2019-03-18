/**
 * Created by mohammad on 3/18/2019 AD.
 */

import {BaseCall, AlteredCall} from '../index';

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


}

export default Story;