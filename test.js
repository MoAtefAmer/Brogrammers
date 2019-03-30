require('dotenv').config()
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
// const AdminsTest = require('./tests/admins')
const InvestorsTest = require('./tests/investors');

const {
  PORT = 3000
} = process.env

mongoose.connect(db, {
  useNewUrlParser: true
})

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
//const lawyerTests = new LawyerTest(3000, 'lawyer')
//const adminsTests = new AdminsTest(3000, 'admins')
const investorTests = new InvestorsTest(3000, 'investors')

describe('Let me first run the independent tests', () => {
  Promise.all([
    //adminsTests.runTests(),
    investorTests.runTests(),
   // lawyerTests.runTests()
  ]).then(result => {
  })
})
