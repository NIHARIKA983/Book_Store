const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');

chai.use(chaiHttp);
const bookDB = require('./book.json');
chai.should();

describe('create book api', () => {
  it('book', (done) => {
    const token = bookDB.book.validToken;
    const createBook = {
      author: faker.lorem.word(),
      quantity: 100,
      price: 350, 
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .post('/books')
      .set({ authorization: token })
      .send(createBook)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('givenAddBook_whenInvalidToken_shouldNotbeCreated', (done) => {
    const token = bookDB.book.invalidToken;
    const createBook = {
      author: faker.lorem.word(),
      quantity: 100,
      price: 350, 
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .post('/books')
      .set({ authorization: token })
      .send(createBook)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get book test cases
describe('get book api', () => {
  // it('book', (done) => {
  //   const token = bookDB.book.getbookWithValidToken;
  //   chai
  //     .request(server)
  //     .get('/getbooks')
  //     .set({ authorization: token })
  //     .end((err, res) => {
  //       res.should.have.status(201);
  //       done();
  //     });
  // });

  it('givenCreateBook_whenInvalidToken_shouldNotbeGet', (done) => {
    const token = bookDB.book.getbookWithInValidToken;
    chai
      .request(server)
      .get('/getbooks')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// update book test cases
describe('Update boook api', () => {
  // it('givenPoperDetails_ShouldUpdateBook', (done) => {
  //   const token = bookDB.book.getbookWithValidToken;
  //   const note = bookDB.updateBook.validData;
  //   chai
  //     .request(server)
  //     .put('/books/617c028deae0a5346d939e65')
  //     .set({ authorization: token })
  //     .send(note)
  //     .end((err, res) => {
  //       res.should.have.status(201);
  //       done();
  //     });
  // });

  it('givenInvalidToken_ShouldNotUpdateNote', (done) => {
    const token = bookDB.book.getbookWithInValidToken;
    const note = bookDB.updateBook.validData;
    chai
      .request(server)
      .put('/books/617c028deae0a5346d939e65')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// delete book test cases
describe('delete book api', () => {
  // it('givenImPoperDetails_ShouldNotDeleteBook', (done) => {
  //   const token = bookDB.book.getbookWithValidToken;
  //   chai
  //     .request(server)
  //     .delete('/deletebooks/617cb0692bb75e7474aaf682')
  //     .set({ authorization: token })
  //     .end((err, res) => {
  //       res.should.have.status(500);
  //       done();
  //     });
  // });

  it('givenInvalidToken_ShouldNotDeleteBook', (done) => {
    const token = bookDB.book.getbookWithInValidToken;
    chai
      .request(server)
      .delete('/deletebooks/617cb0692bb75e7474aaf682')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});