const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);

describe('About', () => {
    // TEST ROOT
    it('should display quiz on /about GET', (done) => {
        chai.request(server)
            .get('/about')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});
