
# Endpoints

- /api/investors/register
    - POST `//=> investor register (creating an account)`
        - !name: string().min(3)
        - !type: string().length(3)
        - !gender: string().valid('male', 'female')
        - !nationality: string().max(25)
        - !idType: string().valid('Passport', 'National ID')
        - !idNumber: String()
        - !dob: date()
        - !address: string()
        - !telephone: number()
        - fax: number()
        - !mail: string()
        - !password: string()

- /routes/api/admins/register
    - POST `//=> admin register (must be done by another admin)`
        - !name: string()
        - !gender: string().valid('male', 'female')
        - !birthDate: string()
        - !phone: number()
        - !email: string()
        - !password: string().min(8).max(20)
        - joinDate: string()

- /api/lawyer/register
    - POST `//=> lawyer register (must be done by admin)`
        - !firstName: string().min(1)
        - !middleName: string().min(1)
        - !lastName: string().min(1)
        - !email: string().email()
        - !password: string().min(8)
        - !mobile_number: string().min(6)
        - !Social_Security_Number: string().min(14).max(14),
        - !salary: number(),
        - !birth_Date: date(),
        - !yearsOfExperience: number()

- /api/reviewer/register
    - POST `//=> reviewer register (must be done by admin)`
        - !ssn: number()
        - !name: string()
        - !gender: string()
        - !address: string()
        - !phone: number()
        - !email: string()
        - !password: string()
        - !yearsOfExperience: number()
        - !age: number()
        - !birth: string()
        - !task: number()

- /routes/api/admins/login
    - POST `//=> admin login `
        - email: string()
        - password: string()

- /api/lawyer/login
    - POST `//=> lawyer login `
        - email: string()
        - password: string()


- /api/reviewer/login
    - POST `//=> reviewer login `
        - email: string()
        - password: string()

 - /api/lawyer/editForm/:id
    - GET `//=> views rejected fourms submitted by this lawyer `

 - /api/lawyer/editForm/:id/:companyId
    - PUT `//=> lawyer can update a certain companies fourm after it was rejected by a reviewer `
	    - nameInArabic: string()
        - nameInEnglish: string()
        - governerateHQ: string()
        - cityHQ: string()
        - addressHQ: string()
        - telephoneHQ: number()
        - faxHQ: number()
        - capitalCurrency: string()
        - capital: number().min(50000)
        - investorName: string()
        - investorType: string()
        - investorSex: string()
        - investorNationality: string()
        - investorIdentificationType: string()
        - investorIdentificationNumber: string()
        - investorBD: date()
        - investorAddress: string()
        - investorTelephone: string()
        - investorFax: string()
        - investorEmail: string()
        - managers: array()
        - lawyerComment: string()
        - lawyer: string()
        - status: string()