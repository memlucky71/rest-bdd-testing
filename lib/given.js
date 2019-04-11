/**
 * Created by mohammad on 4/8/2019 AD.
 */

import Story from './story';
import BaseCall from './call/base_call';
import AlteredCall from './call/altered_call';
import {Manipulator} from './manipulation';

class Given extends Story{
    constructor(application, title, description, otherParams={}) {
        let {autodump=true, autodoc=true, ...baseCallParams} = otherParams;
        let baseCall = new BaseCall(title, description, baseCallParams);
        super(baseCall);

        this.autodump = autodump;
        this.autodoc = autodoc;
        this.application = application;
    }

    requestBaseCall() {
        return this.baseCall.invoke(this.application);
    }

    when(title, description, callParams={}) {
        for (const key of Object.keys(callParams)) {
            if (callParams[key] instanceof Manipulator) {
                let clonedParams = {...this.baseCall[key]};
                callParams[key].apply(clonedParams);
                callParams[key] = clonedParams;
            }
        }
        let newCall = new AlteredCall(this.baseCall, title, description, callParams);
        this.calls.push(newCall);
        return newCall.invoke(this.application);
    }

    document() {
        this.document()
    }

}


export default Given;

