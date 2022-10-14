//TODO import models

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
/*
  * Test the /GET route
  */
describe('/GET details', () => {
    it('it should GET details', (done) => {
      chai.request(server)
          .get("/movie/detail")
          .query({title: 'hellboy'}) 
          .end((err,res,req) => {
            if(err){
              console.log(err);
                }
                res.should.have.status(200);
                res.body.should.have.property('title');
                expect(res.body.title).equal('hellboy');
                expect(res.body.characters[0].name).equal('piruletica');
                //expect(req).to.have.param('title');
            done();
          });
    });
});
