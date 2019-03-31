const nfetch = require('node-fetch')
const Lawyer = require('../models/Lawyer')
const Company = require('../models/Company')
const Admin = require('../models/Admin')
var jwt = require('jsonwebtoken')
var config = require('../config/jwt')

class LawyerTest {

    constructor(PORT, ROUTE) {
        this.base_url = `http://localhost:${PORT}/api/${ROUTE}`
        this.sharedState = {
            id: null,
            adminToken: null,
            token: null,
            wrongsocialSecurityNumber: 64168186,
            wrongSsn: 64168186,
            wrongcompanyID: "5c93edd75c231e4f2c79e9b4",
            wrongToken: jwt.sign({ id: "5c9d20d34087a25fc4147d17" }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            }),
            socialSecurityNumber: null,
            firstName: null,
            middleName: null,
            lastName: null,
            email: null,
            password: null,
            mobileNumber: null,
            salary: null,
            birthDate: null,
            yearsOfExperience: null
        }
    }

    runTests1() {
        try {
            return new Promise((resolve, reject) => {
                describe('Checking company Sprint 1 tests', () => {
                    this.creatingAnAdminAsCrud(),
                        this.creatingLawyerWithoutLoggingIn(),
                        this.creatingLawyerByAdmin(),
                        this.creatingLawyerByLawyer(),
                        this.creatingLawyerCorruptedToken(),
                        this.showwithoutloggingin(),
                        this.wrongAuthShowMyCase(),
                        this.showMyCases(),
                        this.showMyCaseswithAnotherToken(),
                        this.showMyCaseswithtokenThatisforAnotherPerson(),
                        this.logInWithUserNotFound(),
                        this.logInWithWrongPassword(),
                        this.lawyersViewEditableCompaniesAfterRejectionAlreadyLogged(),
                        this.lawyersViewEditableCompaniesWithoutLogin(),
                        this.lawyersViewEditableCompaniesThatIsNotHisCheckingByToken(),
                        this.lawyersViewEditableCompaniesThatIsNotHisCheckingBySsn(),
                        this.lawyersEditForum(),
                        this.lawyersEdittForumWithoutLogin(),
                        this.lawyersEditForumWrongSsn(),
                        this.lawyersEditForumWrongCompanyId(),
                        this.lawyersEditForumWrongSsnAndCompanyId(),
                        this.logInWithRightPassword(),
                        this.updateLawyerCorrectIdAndToken(),
                        this.updateLawyerWrongId(),
                        this.updateLawyerWrongToken(),
                        this.updateLawyerNullToken()
                })
                resolve()
            })
        } catch (err) { }
    }

    runTests2() {
        try {
            return new Promise((resolve, reject) => {
                describe(`Testing Lawyer's ability to fill a case for the start of an investor's company `, () => {
                    this.lawyerCreateCompanySSCLoggedIn(),
                        this.lawyerCreateCompanySSCNotLoggedIn(),
                        this.lawyerCreateCompanySSCCorruptToken(),
                        this.lawyerCreateCompanySSCNotLoggedInAsLawyer(),
                        this.lawyerCreateCompanySSCInvalidCompanyOrInvestorFields(),
                        this.lawyerCreateCompanySPCLoggedIn(),
                        this.lawyerCreateCompanySPCNotLoggedIn(),
                        this.lawyerCreateCompanySPCCorruptToken(),
                        this.lawyerCreateCompanySPCNotLoggedInAsLawyer(),
                        this.lawyerCreateCompanySPCInvalidCompanyOrInvestorFields()
                })

                resolve();
            })
        } catch (err) {

        }
    }

    lawyerCreateCompanySSCLoggedIn() {
        var date1 = new Date('December 17, 1995 03:24:00');
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000,
            managers: [],
            investorName: "mohamed",
            investorType: "alaa",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: "4516515165156",
            investorBD: date1,
            investorAddress: "rehab",
            investorTelephone: "25262512",
            investorFax: "51622415",
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer's ability to fill a new SSC company form for an investor while logged in, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual(["msg", "data"])

            const company = await Company.findById(jsonResponse.data._id).exec()

            expect(company.regulationLaw).toEqual(requestBody.regulationLaw)
            expect(company.legalCompanyForm).toEqual(requestBody.legalCompanyForm)
            expect(company.nameInArabic).toEqual(requestBody.nameInArabic)
            expect(company.nameInEnglish).toEqual(requestBody.nameInEnglish)
            expect(company.governerateHQ).toEqual(requestBody.governerateHQ)
            expect(company.cityHQ).toEqual(requestBody.cityHQ)
            expect(company.addressHQ).toEqual(requestBody.addressHQ)
            expect(company.telephoneHQ).toEqual(requestBody.telephoneHQ)
            expect(company.faxHQ).toEqual(requestBody.faxHQ)
            expect(company.capitalCurrency).toEqual(requestBody.capitalCurrency)
            expect(company.capital).toEqual(requestBody.capital)
            expect(company.manager).toEqual(requestBody.manager)
            expect(company.investorName).toEqual(requestBody.investorName)
            expect(company.investorType).toEqual(requestBody.investorType)
            expect(company.investorSex).toEqual(requestBody.investorSex)
            expect(company.investorNationality).toEqual(requestBody.investorNationality)
            expect(company.investorIdentificationType).toEqual(requestBody.investorIdentificationType)
            expect(company.investorIdentificationNumber).toEqual(requestBody.investorIdentificationNumber)
            expect(company.investorBD).toEqual(requestBody.investorBD)
            expect(company.investorAddress).toEqual(requestBody.investorAddress)
            expect(company.investorTelephone).toEqual(requestBody.investorTelephone)
            expect(company.investorFax).toEqual(requestBody.investorFax)
            expect(company.investorEmail).toEqual(requestBody.investorEmail)
        })
    }

    lawyerCreateCompanySSCNotLoggedIn() {
        var date1 = new Date('December 17, 1995 03:24:00');
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000,
            managers: [],
            investorName: "mohamed",
            investorType: "alaa",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: date1,
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer's ability to fill a new SSC company form for an investor while not logged in, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json'}
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Lawyer`)
            expect(jsonResponse).toEqual({ "auth": false, "message": "Please login first." })
        })
    }

    lawyerCreateCompanySSCCorruptToken() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
            managers: [],
            investorName: "mohamed",
            investorType: "alaa",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "1998-04-03T22:00:00.000Z",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer ability to fill a new SSC company form for an investor while logged in, but having an invaild token, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': "rmbkelllv" }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' })
        })
    }

    lawyerCreateCompanySSCNotLoggedInAsLawyer() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: '80000',
            managers: [],
            investorName: "mohamed",
            investorType: "alaa",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "1998-04-03T22:00:00.000Z",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing ability to fill a new SSC company form while not logged in as a Lawyer , \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.adminToken }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ error: 'Lawyer does not exist' })
        })
    }

    lawyerCreateCompanySSCInvalidCompanyOrInvestorFields() {
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: '07775000',
            faxHQ: '07775000',
            capitalCurrency: "US Dollars",
            capital: "80000",
            managers: [],
            investorName: "mohamed",
            investorType: 555,
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: '4516515165156',
            investorBD: "1998-04-03T22:00:00.000Z",
            investorAddress: "rehab",
            investorTelephone: '25262512',
            investorFax: '51622415',
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing Lawyers ability to fill a new SSC company form while logged in, but filling invalid Info, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createssccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(Object.keys(jsonResponse)).toEqual(["error"])
        })
    }

















    lawyerCreateCompanySPCLoggedIn() {
        var date1 = new Date('December 17, 1995 03:24:00');
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000,
            investorName: "mohamed",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: "4516515165156",
            investorBD: date1,
            investorAddress: "rehab",
            investorTelephone: "25262512",
            investorFax: "51622415",
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer's ability to fill a new SSC company form for an investor while logged in, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual(["msg", "data"])

            const company = await Company.findById(jsonResponse.data._id).exec()

            expect(company.regulationLaw).toEqual(requestBody.regulationLaw)
            expect(company.legalCompanyForm).toEqual(requestBody.legalCompanyForm)
            expect(company.nameInArabic).toEqual(requestBody.nameInArabic)
            expect(company.nameInEnglish).toEqual(requestBody.nameInEnglish)
            expect(company.governerateHQ).toEqual(requestBody.governerateHQ)
            expect(company.cityHQ).toEqual(requestBody.cityHQ)
            expect(company.addressHQ).toEqual(requestBody.addressHQ)
            expect(company.telephoneHQ).toEqual(requestBody.telephoneHQ)
            expect(company.faxHQ).toEqual(requestBody.faxHQ)
            expect(company.capitalCurrency).toEqual(requestBody.capitalCurrency)
            expect(company.capital).toEqual(requestBody.capital)
            expect(company.investorName).toEqual(requestBody.investorName)
            expect(company.investorSex).toEqual(requestBody.investorSex)
            expect(company.investorNationality).toEqual(requestBody.investorNationality)
            expect(company.investorIdentificationType).toEqual(requestBody.investorIdentificationType)
            expect(company.investorIdentificationNumber).toEqual(requestBody.investorIdentificationNumber)
            expect(company.investorBD).toEqual(requestBody.investorBD)
            expect(company.investorAddress).toEqual(requestBody.investorAddress)
            expect(company.investorTelephone).toEqual(requestBody.investorTelephone)
            expect(company.investorFax).toEqual(requestBody.investorFax)
            expect(company.investorEmail).toEqual(requestBody.investorEmail)
        })
    }

    lawyerCreateCompanySPCNotLoggedIn() {
        var date1 = new Date('December 17, 1995 03:24:00');
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000,
            investorName: "mohamed",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: "4516515165156",
            investorBD: date1,
            investorAddress: "rehab",
            investorTelephone: "25262512",
            investorFax: "51622415",
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer's ability to fill a new SPC company form for an investor while not logged in, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ "auth": false, "message": "Please login first." })
        })
    }

    lawyerCreateCompanySPCCorruptToken() {
        var date1 = new Date('December 17, 1995 03:24:00');
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000,
            investorName: "mohamed",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: "4516515165156",
            investorBD: date1,
            investorAddress: "rehab",
            investorTelephone: "25262512",
            investorFax: "51622415",
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing lawyer ability to fill a new SPC company form for an investor while logged in, but having an invaild token, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': "rmbkelllv" }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' })
        })
    }

    lawyerCreateCompanySPCNotLoggedInAsLawyer() {
        var date1 = new Date('December 17, 1995 03:24:00');
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000,
            investorName: "mohamed",
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: "4516515165156",
            investorBD: date1,
            investorAddress: "rehab",
            investorTelephone: "25262512",
            investorFax: "51622415",
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing ability to fill a new SPC company form while not logged in  as a Lawyer, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.adminToken }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(jsonResponse).toEqual({ error: 'Lawyer does not exist' })
        })
    }

    lawyerCreateCompanySPCInvalidCompanyOrInvestorFields() {
        var date1 = new Date('December 17, 1995 03:24:00');
        const requestBody = {
            regulationLaw: "Law 159",
            legalCompanyForm: "CompanyForm",
            nameInArabic: "esm bel 3araby",
            nameInEnglish: "WAW",
            governerateHQ: "New Cairo",
            cityHQ: "Cairo",
            addressHQ: "Rehab City",
            telephoneHQ: 7775000,
            faxHQ: 7775000,
            capitalCurrency: "US Dollars",
            capital: 80000,
            investorName: 55555,
            investorSex: "male",
            investorNationality: "Egyptian",
            investorIdentificationType: "basbor",
            investorIdentificationNumber: "4516515165156",
            investorBD: date1,
            investorAddress: "rehab",
            investorTelephone: "25262512",
            investorFax: "51622415",
            investorEmail: "mohamed@gmail.com"
        }
        test(`Testing Lawyer's ability to fill a new SPC company form while logged in, but with invalid inputs, \t\t[=> POST ${this.base_url}\/lawyerinvestor\/createspccompany`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/lawyerinvestor/createspccompany", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            console.log(`Creating Form for Investor`)
            expect(Object.keys(jsonResponse)).toEqual(["error"])
        })
    }












    creatingLawyerWithoutLoggingIn() {
        const requestBody = {

            firstName: "please no2",
            middleName: "reyaaaad",
            lastName: "mohamed",
            password: "abcakakaka",
            email: "tes11q121t.com",
            mobileNumber: "01060187952",
            socialSecurityNumber: "29821114524525",
            salary: 105151,
            birthDate: "1998-04-03T22:00:00.000Z",
            yearsOfExperience: 4
        }

        test(`Creeating A Lawyer without logging in,\t\t[=> POST ${this.base_url}\register`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/register", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()

            console.log(`${this.base_url}\register`);
            // check if the json response has data not error
            expect(jsonResponse).toEqual({ "auth": false, "message": "Please login first." })

        })
    }


    creatingLawyerByAdmin() {
        const requestBody = {
            firstName: "please no2",
            middleName: "reyaaaad",
            lastName: "mohamed",
            password: "abcakakaka",
            email: "omar.com",
            mobileNumber: "01060187952",
            socialSecurityNumber: "12345",
            salary: "105151",
            birthDate: "1998-04-03T22:00:00.000Z",
            yearsOfExperience: "4"
        }

        test(`Creating A Lawyer as using authentication by another admin,\t\t[=> POST ${this.base_url}\register`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/register", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.sharedState.adminToken
                }
            })
            const jsonResponse = await response.json()

            // check if the json response has data not error
            expect(Object.keys(jsonResponse)).toEqual(['auth', 'token', 'msg', 'data'])

            // go check in the mongo database
            const lawyer = await Lawyer.findById(jsonResponse.data._id).exec()
            expect(lawyer.firstName).toEqual(requestBody.firstName)
            expect(lawyer.phone).toEqual(requestBody.phone)
            expect(lawyer.email).toEqual(requestBody.email)
            expect(lawyer.socialSecurityNumber).toEqual(requestBody.socialSecurityNumber)
            this.sharedState.id = lawyer.id
            this.sharedState.token = jsonResponse.token
            console.log(this.sharedState.token)
            this.sharedState.socialSecurityNumber = lawyer.socialSecurityNumber




        })

    }


    creatingLawyerByLawyer() {
        const requestBody = {
            firstName: "please no2",
            middleName: "reyaaaad",
            lastName: "mohamed",
            password: "abcakakaka",
            email: "omar.com",
            mobileNumber: "01060187952",
            socialSecurityNumber: "12345",
            salary: "1235234",
            birthDate: "1998-04-03T22:00:00.000Z",
            yearsOfExperience: "4"
        }

        test(`Creating A Lawyer as using authentication by another lawyer,\t\t[=> POST ${this.base_url}\register`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/register", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.sharedState.token
                }
            })
            const jsonResponse = await response.json()

            // check if the json response has data not error
            expect(jsonResponse).toEqual({ "error": "You are not an admin" })



        })

    }


    creatingLawyerCorruptedToken() {
        const requestBody = {
            firstName: "please no2",
            middleName: "reyaaaad",
            lastName: "mohamed",
            password: "abcakakaka",
            email: "tes11q12t.com",
            mobileNumber: "01060187952",
            socialSecurityNumber: "29821114524525",
            salary: "105151",
            birthDate: "1998-04-03T22:00:00.000Z",
            yearsOfExperience: "4"
        }

        test(`Creating A Lawyer as using authentication by corrupted token,\t\t[=> POST ${this.base_url}\register`, async () => {
            const response = await nfetch("http://localhost:3000/api/lawyer/register", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': "abcc"
                }
            })
            const jsonResponse = await response.json()

            // check if the json response has data not error
            expect(jsonResponse).toEqual({ "auth": false, "message": "Failed to authenticate token." })



        })

    }




    creatingAnAdminAsCrud() {
        const requestBody = {
            name: "manga",
            password: "momonjvjf",
            birthDate: "2018-05-01",
            gender: "Female",
            joinDate: "5/5/2017",
            email: "kancom",
            phone: "01111088333"
        }

        test(`Creating An Admin as CRUD without authentication,\t\t[=> POST ${this.base_url}\register`, async () => {
            const response = await nfetch("http://localhost:3000/routes/api/admins/registerNo", {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()

            // check if the json response has data not error
            expect(Object.keys(jsonResponse)).toEqual(['auth', 'token', 'msg', 'data'])

            // go check in the mongo database
            const admin = await Admin.findById(jsonResponse.data._id).exec()
            expect(admin.name).toEqual(requestBody.name)
            expect(admin.phone).toEqual(requestBody.phone)
            expect(admin.email).toEqual(requestBody.email)
            this.sharedState.id = admin.id
            this.sharedState.adminToken = jsonResponse.token


        })


    }
    wrongAuthShowMyCase() {
        test(`Showing my cases with wrong authauntication,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
            const response = await nfetch(`http://localhost:3000/api/lawyer/mycases/${this.sharedState.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': "tasdfasdf"
                }

            })
            const jsonResponse = await response.json()
            // check if the json response has data not error
            expect(jsonResponse).toEqual({ "auth": false, "message": "Failed to authenticate token." })


        })
    }
    showwithoutloggingin() {
        test(`Showing my cases without logging in,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
            const response = await nfetch(`http://localhost:3000/api/lawyer/mycases/${this.sharedState.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }

            })
            const jsonResponse = await response.json()
            // check if the json response has data not error
            expect(jsonResponse).toEqual({ "auth": false, "message": "Please login first." })


        })
    }
    showMyCaseswithAnotherToken() {
        test(`Showing my cases with another token,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
            const response = await nfetch(`http://localhost:3000/api/lawyer/mycases/${this.sharedState.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.sharedState.wrongToken
                }

            })
            const jsonResponse = await response.json()
            // check if the json response has data not error
            expect(jsonResponse).toEqual({ error: 'You are not a Lawyer' })


        })
    }


    showMyCaseswithtokenThatisforAnotherPerson() {
        test(`Showing my cases with another token,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
            const response = await nfetch(`http://localhost:3000/api/lawyer/mycases/5c9d20d34087a25fc4147d17`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.sharedState.token
                }

            })
            const jsonResponse = await response.json()
            // check if the json response has data not error
            expect(jsonResponse).toEqual({ error: 'Wrong ID' })


        })
    }


    showMyCases() {
        test(`Showing my cases,\t\t\t[=> GET\t${this.base_url}mycases/:id\t`, async () => {
            const response = await nfetch(`http://localhost:3000/api/lawyer/mycases/${this.sharedState.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.sharedState.token
                }

            })
            const jsonResponse = await response.json()
            // check if the json response has data not error
            expect(Object.keys(jsonResponse)).toEqual(['data'])

            var query = {
                $and: [{ status: 'PendingLawyer' }, { lawyer: this.sharedState.socialSecurityNumber }]
            }
            const checkCase = await Company.find(query).exec().then()
            console.log(checkCase)
            if (checkCase == [])
                expect(checkCase).toEqual([])
            else {
                for (var i = 0; i < checkCase.length; i++) {
                    console.log(123)
                    expect(checkCase[i].status).toEqual("PendingLawyer"),
                        expect(checkCase[i].lawyer).toEqual(this.sharedState.socialSecurityNumber)
                }
            }




        })

    }

    logInWithUserNotFound() {
        const requestBody = {
            email: 'notreg@sumerge.com',
            password: '123456789'
        }

        test(`logInWithUserNotFound,\t\t[=> POST ${this.base_url}\/login`, async () => {
            const response = await nfetch('http://localhost:3000/api/lawyer/login', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()

            console.log(`${this.base_url}\/login`)

            expect(jsonResponse).toEqual({ auth: false, message: 'No user found.' })
        })
    }

    logInWithWrongPassword() {
        const requestBody = {
            email: 'omar.com',
            password: '12345678'
        }

        test(`logInWithWrongPassword,\t\t[=> POST ${this.base_url}\/login`, async () => {
            const response = await nfetch('http://localhost:3000/api/lawyer/login', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()

            console.log(`${this.base_url}\/login`)

            expect(jsonResponse).toEqual({ auth: false, token: null })
        })
    }

    logInWithRightPassword() {
        const requestBody = {
            email: 'omar.com',
            password: 'abcakakaka'
        }

        test(`logInWithRightPassword,\t\t[=> POST ${this.base_url}\/login`, async () => {
            const response = await nfetch('http://localhost:3000/api/lawyer/login', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })

            const jsonResponse = await response.json()
            this.sharedState.token = jsonResponse.token
            const token = jsonResponse.token

            console.log(`${this.base_url}\/login`)
            expect(jsonResponse).toEqual({ auth: true, token: token })
        })
    }

    lawyersViewEditableCompaniesAfterRejectionAlreadyLogged() {
        test(`Getting this logged in lawyers's editable companies that was rejected by reviewer ,[=> GET${this.base_url}/editForm/:id`, async () => {
            const response = await nfetch(`${this.base_url}/editForm/${this.sharedState.socialSecurityNumber}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual(["data"])
        })
    }
    lawyersViewEditableCompaniesWithoutLogin() {
        test(`Getting not logged in lawyers's editable companies that was rejected by reviewer ,[=> GET${this.base_url}/editForm/:id`, async () => {
            const response = await nfetch(`${this.base_url}/editForm/${this.sharedState.socialSecurityNumber}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const jsonResponse = await response.json()

            expect(jsonResponse).toEqual({ auth: false, message: 'No token provided.' })
        })
    }

    lawyersViewEditableCompaniesThatIsNotHisCheckingByToken() {
        test(`Lawyer trying to view editable companies that are not his as he has a wrong token ,[=> GET${this.base_url}/editForm/:id`, async () => {
            const response = await nfetch(`${this.base_url}/editForm/${this.sharedState.socialSecurityNumber}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'x-access-token': 'wrongToken' }
            })
            const jsonResponse = await response.json()
            expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' })
        })
    }

    lawyersViewEditableCompaniesThatIsNotHisCheckingBySsn() {
        test(`Lawyer trying to view editable companies that are not his as he has a wrong token ,[=> GET${this.base_url}/editForm/:id`, async () => {
            const response = await nfetch(`${this.base_url}/editForm/${this.sharedState.wrongsocialSecurityNumber}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()
            expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' })
        })
    }


    lawyersEditForum() {
        const requestBody = {
            investorName: "lll"
        }
        test(`editing a disaproved form from reviewer,[=>PUT${this.base_url}/editForm/:id/:companyId`, async () => {
            const response = await nfetch(`${this.base_url}/editForm/${this.sharedState.socialSecurityNumber}/${this.sharedState.companyID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual(["msg"])
        })
    }
    lawyersEdittForumWithoutLogin() {
        const requestBody = {
            investorName: "lll"
        }

        test(`Lawyer trys to edit form without logging in,[=>PUT${this.base_url}/editForm/:id/:companyId`, async () => {
            const response = await nfetch(`${this.base_url}/editForm/${this.sharedState.socialSecurityNumber}/${this.sharedState.companyID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-access-token': 'wrongToken' }
            })
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual(["auth", "message"])
        })
    }
    lawyersEditForumWrongSsn() {
        const requestBody = {
            investorName: "lll"
        }

        test(`Lawyer tries to edit the form but the SSN is incorrect,[=>PUT${this.base_url}/editForm/:id/:companyId`, async () => {
            const response = await nfetch(`${this.base_url}/editForm/1/${this.sharedState.companyID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual(["auth", "message"])
        })
    }

    lawyersEditForumWrongCompanyId() {
        const requestBody = {
            investorName: "lll"
        }

        test(`Lawyer tries to edit the form but the company doest not exist,[=>PUT${this.base_url}/editForm/:id/:companyId`, async () => {
            const response = await nfetch(`${this.base_url}/editForm/${this.sharedState.socialSecurityNumber}/${this.sharedState.wrongcompanyID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual(["error"])
        })
    }

    lawyersEditForumWrongSsnAndCompanyId() {
        const requestBody = {
            investorName: "lll"
        }

        test(`Lawyer tries to edit the form but the company doest not exist and SSN is incorrect,[=>PUT${this.base_url}/editForm/:id/:companyId`, async () => {
            const response = await nfetch(`${this.base_url}/editForm/${this.sharedState.wrongSsn}/${this.sharedState.wrongcompanyID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-access-token': this.sharedState.token }
            })
            const jsonResponse = await response.json()

            expect(Object.keys(jsonResponse)).toEqual(["auth", "message"])
        })
    }



    updateLawyerCorrectIdAndToken() {
        const requestBody = {
            email: "ahmedhsaid@gmail.com",
            password: "kill me now"
        }

        test(`Updating the specified lawyer's information providing the correct Id and token`, async () => {
            const response = await nfetch('http://localhost:3000/api/lawyer/' + this.sharedState.id, {
                method: "PUT",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.sharedState.token
                }
            });
            const jsonResponse = await response.json();
            expect(jsonResponse).toEqual({ msg: 'Lawyer updated successfully' });
        })
    }

    updateLawyerWrongId() {
        const requestBody = {
            email: "ahmedhsaid@gmail.com.com",
            password: "kill me now"
        }

        test(`Updating the specified lawyer's information providing the correct Id and token`, async () => {
            const response = await nfetch('http://localhost:3000/api/lawyer/yeet', {
                method: "PUT",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.sharedState.token
                }
            });
            const jsonResponse = await response.json();
            expect(jsonResponse).toEqual({ msg: 'You do not have the authorization' });
        })
    }

    updateLawyerWrongToken() {
        const requestBody = {
            email: "ahmedhsaid@gmail.com",
            password: "kill me now"
        }

        test(`Updating the specified lawyer's information providing the correct Id and token`, async () => {
            const response = await nfetch('http://localhost:3000/api/lawyer/' + this.sharedState.id, {
                method: "PUT",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': 'hehexd'
                }
            });
            const jsonResponse = await response.json();
            expect(jsonResponse).toEqual({ auth: false, message: 'Failed to authenticate token.' });
            const lawyer = await Lawyer.findById(this.sharedState.id);
            this.sharedState.birthDate = lawyer.birthDate
            this.sharedState.email = lawyer.email
            this.sharedState.firstName = lawyer.firstName
            this.sharedState.middleName = lawyer.middleName
            this.sharedState.lastName = lawyer.lastName
            this.sharedState.mobileNumber = lawyer.mobileNumber
            this.sharedState.password = lawyer.password
            this.sharedState.salary = lawyer.salary
            this.sharedState.socialSecurityNumber = lawyer.socialSecurityNumber
            this.sharedState.yearsOfExperience = lawyer.yearsOfExperience
        })
    }

    updateLawyerNullToken() {
        const requestBody = {
            email: "ahmedhsaid@gmail.com",
            password: "kill me now"
        }

        test(`Updating the specified lawyer's information providing the correct Id and token`, async () => {
            const response = await nfetch('http://localhost:3000/api/lawyer/' + this.sharedState.id, {
                method: "PUT",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const jsonResponse = await response.json();
            expect(jsonResponse).toEqual({ auth: false, message: 'No token provided.' });
        })
    }
}
module.exports = LawyerTest