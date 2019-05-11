/**
 * Created by mohammad on 4/8/2019 AD.
 */

const fs = require('fs');

import nestedObjectAssign from 'nested-object-assign';

import Story from './story';
import BaseCall from './call/base_call';
import AlteredCall from './call/altered_call';
import {Manipulator} from './manipulation';

class Given extends Story {
    constructor(application, title, description, otherParams={}) {
        let {autodump=null, autodoc=null, fieldInfo=null, ...baseCallParams} = otherParams;
        let baseCall = new BaseCall(title, description, baseCallParams);
        super(baseCall);

        this.autodump = autodump;
        this.autodoc = autodoc;
        this.fieldInfo = fieldInfo;
        this.application = application;
    }

    get dumpedFileName() {
        if (this.autodump === null) return null;
        if (typeof this.autodump === 'string') return this.autodump;
        if (typeof this.autodump === 'function') return this.autodump(this)
    }

    get docFileName() {
        if (this.autodoc === null) return null;
        if (typeof this.autodoc === 'string') return this.autodoc;
        if (typeof this.autodoc === 'function') return this.autodoc(this)
    }

    requestBaseCall() {
        return this.baseCall.invoke(this.application);
    }

    when(title, description, callParams={}) {
        for (const key of Object.keys(callParams)) {
            if (callParams[key] instanceof Manipulator) {
                let clonedParams = nestedObjectAssign({}, this.baseCall[key]);
                callParams[key].apply(clonedParams);
                callParams[key] = clonedParams;
            }
        }
        let newCall = new AlteredCall(this.baseCall, title, description, callParams);
        this.calls.push(newCall);
        return newCall.invoke(this.application);
    }

    end() {
        if (this.autodump) {
            let fd = fs.openSync(this.dumpedFileName, 'w+');
            this.dump(fd);
            fs.closeSync(fd);
        }

        if (this.autodoc) {
            let fd = fs.openSync(this.docFileName, 'w+');
            this.document(fd, {fieldInfo: this.fieldInfo});
            fs.closeSync(fd);
        }
    }

}


export default Given;

