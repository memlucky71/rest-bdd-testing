/**
 * Created by mohammad on 3/9/2019 AD.
 */

const path = require('path');
const fs = require('fs');


class Story {

    constructor(verb, url, description, response, error, queryString, requestBody,  branchPath, resource=null) {
        this.verb = verb;
        this.url = url;
        this.description = description;
        this.response = response;
        this.error = error;
        this.queryString = queryString;
        this.requestBody = requestBody;
        this.branchPath = branchPath;
        this._resource = resource;
    }

    get resource() {
        return this._resource || this.url.split('/')[2];
    }

    get resourcePath() {
        const resourceFileName = this.resource + '.md';
        return path.join(this.branchPath, resourceFileName);
    }

    document() {
        let response;
        let queryString = '';
        let requestBody = '';
        if (this.error) {
            response = `
###Error code:
${this.error}
### Response
\`\`\`json
${JSON.stringify(this.response, null, 2)}
\`\`\`
            `
        } else {
            response = `
### Response
\`\`\`json
${JSON.stringify(this.response, null, 2)}
\`\`\`
            `
        }

        if (this.queryString)
            queryString = `

### Request Query String
\`\`\`json
${JSON.stringify(this.queryString, null, 2)}
\`\`\`
            `;

        if (this.requestBody)
            requestBody = `
            
### Request Body
\`\`\`json
${JSON.stringify(this.requestBody, null, 2)}
\`\`\`
`;

        let text = `
\n
## ${this.verb.toUpperCase()} ${this.url}
${requestBody}
${queryString}
### Description
${this.description}
${response}
\n
        `;
        fs.appendFileSync(this.resourcePath, text);
    }

}

export default Story;