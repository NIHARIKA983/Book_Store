const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');

chai.use(chaiHttp);
const data = require('./bookData.json');
chai.should();

describe('add_to_cart api', () => {
    it('givenValidBook_ValidTokenAndQuantityShouldAddToCart', (done) => {
      const token = data.validToken;
      const qty = {
        "qty": 2
      } ;
      chai
      .request(server)
      .post('/addToCart/617c028deae0a5346d939e65')
      .set({ authorization: token })
      .send(qty)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

    it('givenValidBook_ValidTokenAndNegativeQuantityShouldReturn201StatusCode_AndMessage(Quantity updated)', (done) => {
        const token = data.validToken;
        const qty = {
          "qty": -1
        } ;
        chai
        .request(server)
        .post('/addToCart/617c028deae0a5346d939e65')
        .set({ authorization: token })
        .send(qty)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('givenValidBook_ValidTokenAndNegativeQuantityShouldReturn201StatusCode', (done) => {
        const token = data.validToken;
        const qty = {
          "qty": -1
        } ;
        chai
        .request(server)
        .post('/addToCart/617c028deae0a5346d939e65')
        .set({ authorization: token })
        .send(qty)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
});

describe('placeOrder api', () => {
    it('givenValidTokenShouldBePurchased', (done) => {
      const token = data.validToken;
      const isPurchased = {
        "isPurchased":true
      } ;
      chai
      .request(server)
      .put('/placeOrder/6185e87384b20566158183e5')
      .set({ authorization: token })
      .send(isPurchased)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

    it('givenInvalidTokenShouldNotPurchased', (done) => {
        const token = data.invalidToken;
        const isPurchased = {
            "isPurchased":true
          } ;
          chai
          .request(server)
          .put('/placeOrder/6185e87384b20566158183e5')
          .set({ authorization: token })
          .send(isPurchased)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
});

describe('get  AllCarts', () => {
  it('cart', (done) => {
    const token = data.validToken;
    chai
      .request(server)
      .get('/carts')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('getAllCarts_whenInvalidToken_shouldNotbeGet', (done) => {
    const token = data.invalidToken;
    chai
      .request(server)
      .get('/carts')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Get cart by ID api', () => {
  it('givenPoperDetails_ShouldGetcart', (done) => {
    const token = data.validToken;
    chai
      .request(server)
      .get('/cart/61851735e91d4e1244f4aed3')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenImpoperToken_ShouldNotGetcart', (done) => {
    const token = data.invalidToken;
    chai
      .request(server)
      .get('/cart/61851735e91d4e1244f4aed3')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});