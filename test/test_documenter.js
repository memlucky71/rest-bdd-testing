/**
 * Created by mohammad on 3/9/2019 AD.
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');

const should = chai.should();


chai.use(chaiHttp);


describe('Document HTTP Request', function () {


    it('Happy Scenario', function(done) {
        const request = chai.request('http://localhost:9001');
        request
            .get('/sample-request')
            .end(function (err, res) {
                res.should.have.status(200);
                documenter.document('GET', '/sample-request', 'Test Happy Scenario', {result: "frog"},
                    null, null, null, 'sample-resource');

                const docFilePath = `${docPath}/sample-resource.md`;

                fs.existsSync(docFilePath).should.be.true;
                let docContent = fs.readFileSync(docFilePath, 'utf8');
                docContent.trim().should.be.equal(
`## GET /sample-request


### Description
Test Happy Scenario

### Response
\`\`\`json
{
  "result": "frog"
}
\`\`\``
                );
                done();
            });
    })

});