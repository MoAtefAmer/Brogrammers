const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI


const LawyerTests= require('./tests/lawyers')
mongoose.connect(db, {
  useNewUrlParser: true
})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Setup before & after all tests run
//= =---------------------------------------------------= =//
//beforeAll(async () => {
//  await mongoose.connection.dropDatabase()
//})
//
//afterAll(async () => {
//  //await mongoose.connection.dropDatabase()
//})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Core tests
//= =---------------------------------------------------= =//

const lawyerTests = new LawyerTests(3000, 'admins')
describe('Let me first run the independent tests', () => {
  Promise.all([
    
    lawyerTests.runTests()
  ]).then(result => {
  })
})
