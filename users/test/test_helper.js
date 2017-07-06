const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {

  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open',()=> { done(); })
    .on('error', ()=> {
      console.log('Warning', error);
    });

});

beforeEach((done) => {
  console.log(mongoose.connection.collections);
  const {users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
