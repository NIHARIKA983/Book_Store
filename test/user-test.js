const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');

chai.use(chaiHttp);
const registrationData = require('./user.json');

chai.should();

describe('user registartion', () => {
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    const registerfaker = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role:"user"
      };
    chai
      .request(server)
      .post('/userRegistration')
      .send(registerfaker)
      .end((err, res) => {
          if(err){
              return done(err);
          }
        res.should.have.status(200);
        done();
      });
  });
  it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
    chai
      .request(server)
      .post('/userRegistration')
      .send(registrationData.user.registrationWithImproperDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('admin registartion', () => {
    it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
        const registerfaker = {
            firstName: faker.name.findName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role:"admin"
          };
      chai
        .request(server)
        .post('/adminRegistration')
        .send(registerfaker)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
      chai
        .request(server)
        .post('/adminRegistration')
        .send(registrationData.user.registrationWithImproperDetails)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("whenGivenDetail_WithoutFirstName_ShouldReturn_FirstNameRequired", (done) => {
      const registerfaker = {
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role:"admin"
      };
    chai
      .request(server)
      .post('/adminRegistration')
      .send(registerfaker)
      .end((err, res) => {
       res.should.have.status(400);
       done();
      });
});
});

describe('login', () => {
  it('givenLoginDetails_whenProper_shouldAbleToLogin', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(registrationData.user.login)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenUserLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(registrationData.user.loginWithImproperDetails)
      .end((err, res) => {
        res.should.have.status(400);
      });
      done();
  });
});

describe('forgotPassword', () => {
  it('givenEmail_whenProper_shouldSendMail', (done) => {
    chai
      .request(server)
      .post('/forgotPassword')
      .send(registrationData.user.forgotPasswordData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenEmail_whenImproper_shouldNotSendMail', (done) => {
    chai
      .request(server)
      .post('/forgotPassword')
      .send(registrationData.user.forgotPasswordWithImproperDetails)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });
});

describe('resetPassword', () => {
  it('givenToken_whenImproper_shouldNotResetPassword', (done) => {
    chai
      .request(server)
      .put('/reset-Password')
      .set('token', `${registrationData.user.credentials.wrongToken}`)
      .send(registrationData.user.resetPassword)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it('givenToken_whenProper_shouldResetPassword', (done) => {
    chai
      .request(server)
      .put('/reset-Password')
      .set('token', `${registrationData.user.credentials.token}`)
      .send(registrationData.user.resetPassword)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});


