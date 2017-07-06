const assert = require('assert');
const User = require('../src/user');

describe('Deleteing a user', () => {
  let joe; // js scope of joe.

  beforeEach((done)=>{
    joe = new User({name : "Joe"});

    joe.save()
      .then(() => {
        done();
      });
  })
  //joe instance
  it('model instance remove', (done) =>{
    joe.remove()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  //User class
  it('class method remove', (done) =>{
    //Remove a bunch fo records with some given criteria
    User.remove({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class methode findOneAndRemove', (done) => {
    User.findOneAndRemove({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) =>{
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

});
