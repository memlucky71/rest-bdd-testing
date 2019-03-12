/**
 * Created by mohammad on 3/9/2019 AD.
 */

const path = require('path');

import {createDirectory, removeDirectory} from './files_helper';
import Story from './story';


class Documenter {

    constructor(docPath, branch) {
        this.docPath = docPath;
        this.branch = branch;

        if (this.docPath === undefined || this.branch === undefined ){
            throw Error('Arguments should be present');
        }

        this.init();
    }

    get branchPath() {
        return path.join(this.docPath, this.branch);
    }

    init() {
        removeDirectory(this.branchPath);
        createDirectory(this.branchPath);
    }

    document(verb, url, description, response, error, reqQueryString, reqBody, resource=null) {
        new Story(verb, url, description, response, error, reqQueryString, reqBody, this.branchPath, resource).document();
    }

}

export default Documenter;