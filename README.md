
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
        - !mobileNumber: string().min(6)
        - !socialSecurityNumber: string().min(14).max(14),
        - !salary: number(),
        - !birthDate: date(),
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

	

- /api/investors/login
	- POST `//=> investor login`
		- !email : string()
	    	- !password : string()

- /api/lawyer/mycases/:id
     - GET `//=> get all the cases that was assigned to the lawyer`
     
- /api/reviewer/mycases/:id
     - GET `//=> get all the cases that was assigned to the Reviewer`
     
- /api/investors/register
	- POST`//=> Create an Investor`
	    - !name : string()
	    - !type : string()
	    - !gender : string()
	    - !nationality : string()
	    - !idType : string()
	    - !idNumber : string()
	    - !dob : date()
	    - !address : string()
	    - !telephone : string()
	    - !fax : string()
	    - !mail : string()
	    - !password : string()
	
 - /api/lawyer/:id/getTasks
	- GET `//=> gets specific tasks of a certain lawyer by his id`
	
 - /api/lawyer/getAllTasks/view
	- GET `//=> //Gets all the tasks that are free for any lawyer to choose from`
	
 - /api/lawyer/:id/assignFreeTask/:id2
	- PUT `//=> Lawyer Chooses one task at a time and assigns it to himself/herself`
	
 - /api/lawyer/:id/getTasks/approve/:id2
	- PUT `//=> Lawyer Approves the task and updates the company status `
	
 - /api/lawyer/:id/getTasks/disapprove/:id2
	- PUT `//=> LawyerDisapproves the task and updates company status`
	
 - /api/reviewer/:id/getTasks
	- GET `//=> gets specific tasks of a certain Reviewer by his id`
	
 - /api/reviewer/getAllTasks/view
	- GET `//=> //Gets all the tasks that are free for any Reviewer to choose from`
	
 - /api/reviewer/:id/assignFreeTask/:id2
	- PUT `//=> Reviewer Chooses one task at a time and assigns it to himself/herself`
	
 - /api/reviewer/:id/getTasks/approve/:id2
	- PUT `//=> Reviewer Approves the task and updates the company status `
 - /api/reviewer/:id/getTasks/disapprove/:id2
	- PUT `//=> Reviewer Disapproves the task and updates company status`	

 - /api/reviewer/addcomment/:id/:companyId
	- PUT `//=> Reviewer adds a comment to the application so that the assigned lawyer can update them`
      - reviewerComment: string()
    
 - /api/lawyer/addcomment/:id/:companyId
	- PUT `//=> Lawyer adds a comment to the application so that he would notify the investor by them`
      - lawyerComment: string()
      
 - /api/investors/:id/MyRequests/
	- GET `//=> View my Requests details`    
	
	
- /api/investors/:id/MyRequests/:companyid/
	- GET `//=> View a case Details`
	
 - /api/investors/:id/MyRequests/:companyid/
    - PUT `//=> Update Company form after being rejected by lawyer`
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

- /routes/api/admins/
    - GET `=> View all admins (accessible for logged in users)`
    - PUT `=> Edit currently logged in admin's information`
        - email: string()
        - phone: number()
        - password: string().min(8).max(20)
        - gender: string().valid('Male', 'Female')
    - DELETE `=> Delete currently logged in admin`

- /routes/api/admins/:id
    - GET `=> View a specific admin (accessible for logged in users)`
    - DELETE `=> Delete a specific admin (only possible through another admin)`
    
- /api/investors/
    - GET `=> View all investors (accessible for logged in users)`
    - PUT `=> Edit currently logged in investor's information`
    	 - name: string().min(3).required()
		- type: string().length(3)
		- gender: string().valid('male', 'female')
		- nationality: string().max(25)
		- idType: string().valid('Passport', 'National ID')
		- idNumber: number()
		- dob: date()
		- address: string()
		- telephone: number()
		- fax: number()
		- mail: string()
		- password: string()
    - DELETE `=> Delete currently logged in investor`
 
- /api/investors/:id
    - GET `=> View a specific admin (accessible for logged in users)`
    - DELETE `=> Delete a specific investor (only possible through admin)`

- /api/investors/View/ViewCompanies
    - GET `=> View established and unestablished companies of currently logged in investor`
    
- /api/lawyer/
    - GET `=> View all lawyers (accessible for logged in users)`
    - PUT `=> Edit information of currently logged in lawyer`
    	- firstName: string().min(1)
		- middleName: string().min(1)
		- lastName: string().min(1)
		- email: string().email()
		- password: string().min(8)
		- mobile_number: string().min(6)
		- Social_Security_Number: string().min(14).max(14)
		- salary: number()
		- birth_Date: date()
		- yearsOfExperience = number()

    - DELETE `=> Delete currently logged in lawyer`
    
- /api/lawyer/:id
    - GET `=> Get a specific lawyer (accessible for logged in users)`
    - DELETE `=> Delete a specific lawyer (only accessible through admins)`
    
- /api/reviewer/
    - GET `=> View all reviewers (accessible for logged in users)`
    - PUT `=> Edit information of currently logged in reviewer`
    	- ssn: string()
		- name: string()
		- gender: string()
		- address: string()
		- phone: number()
		- email: string()
		- password: string()
		- yearsOfExperience: number()
		- age: number()
		- birth: string()
    - DELETE `=> Delete currently logged in reviewer`
   
- /api/reviewer/:id
    - GET `=> Get a specific reviewer (accessible for logged in users)`
    - DELETE `=> Delete a specific reviewer (only accessible through admins)`

- /api/investors/:id/viewFees
    - GET `//=> an investor can view the estimated fees of creating a company after he submits a form`

- /api/lawyer/:id/viewFees
    - GET `//=> a lawyer can view the estimated fees of creating a company after he submits a form for an investor`

- /api/lawyer/resubmit/:id/:companyId
    - GET `//=> a lawyer can resubmit disaproved forms after updating them according to the reviewer's guidelines`
    
- /api/routes/admins/getall/cases
    - GET `=> Get all company cases (accessible for admins)`
    
- /api/lawyer/getall/cases
    - GET `=> Get all company cases (accessible for lawyer)`
    
- /api/reviewer/getall/cases
    - GET `=> Get all company cases (accessible for reviewer)`
    
- /api/investors/createssccompany
    - PUT `//=> Create a new ssc  company form as an investor (only accessible for investors)`
		- regulationLaw: string()
		- legalCompanyForm: string()
		- nameInArabic: string()
        - nameInEnglish: string()
        - governerateHQ: string()
        - cityHQ: string()
        - addressHQ: string()
        - telephoneHQ: number()
        - faxHQ: number()
        - capitalCurrency: string()
        - capital: number().min(50000)
        - managers: array()
    	
 - /api/investors/createspccompany
    - PUT `//=> create a new spc Company form as an investor (only accessible for investors)`
		- regulationLaw: string()
		- legalCompanyForm: string()
		- nameInArabic: string()
        - nameInEnglish: string()
        - governerateHQ: string()
        - cityHQ: string()
        - addressHQ: string()
        - telephoneHQ: number()
        - faxHQ: number()
        - capitalCurrency: string()
        - capital: number().min(50000)
	
 - /api/lawyer/lawyerinvestor/createspccompany
    - PUT `//=> Create a new spc Company form as a lawyer for an investor (only accessible for lawyers)`
		- regulationLaw: string()
		- legalCompanyForm: string()
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
        - investorSex: string()
        - investorNationality: string()
        - investorIdentificationType: string()
        - investorIdentificationNumber: string()
        - investorBD: date()
        - investorAddress: string()
        - investorTelephone: string()
        - investorFax: string()
        - investorEmail: string()

 - /api/lawyer/lawyerinvestor/createssccompany
    - PUT `//=> Create a new ssc Company as a lawyer for an investor (only accessible for lawyers)`
		- regulationLaw: string()
		- legalCompanyForm: string()
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
	
 - /api/company/approved
	- GET `//=> Registered on Unregistered Users view all the 'Accepted' companies`
