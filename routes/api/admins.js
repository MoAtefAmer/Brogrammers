const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const Admin = require('../../models/Admin.js');
const mongoose = require('mongoose');
const validator = require('../../validations/adminValidations');
const bcrypt = require('bcryptjs');
const Companys = require('../../models/Company')

router.get('/', async (req, res) => {
    try{
        const info = [];
    const arrayOfAdmins = await Admin.find();
    for(var i = 0;i<arrayOfAdmins.length;i++)
    {
        const admin = arrayOfAdmins[i];
        curr = {
            name : admin.name,
            id : admin.id,
            birthDate : admin.birthDate,
            gender : admin.gender,
            joinDate : admin.joinDate,
            email : admin.email,
            phone : admin.phone
        }
        info.push(curr);
    }
    res.send(info);
    }
    catch(error)
    {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const adminId =  req.params.id;
        const admin = await Admin.findById(adminId);
        curr = {
            name : admin.name,
            id : admin.id,
            birthDate : admin.birthDate,
            gender : admin.gender,
            joinDate : admin.joinDate,
            email : admin.email,
            phone : admin.phone
        }
        res.send(curr);
    }
    catch(error)
    {
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const isValidated = validator.updateValidation(req.body);
    
        if(isValidated.error) 
        {
            return  res.status(400).send({error: isValidated.error.details[0].message});
        }
    
        const updatedAdmin = await Admin.updateOne(req.body);
        // res.send(admin);
        res.json({msg: "Information updated successfully"});
    }
    catch(error)
    {
        console.log(error);
    }
});
    

router.post('/', async (req, res) => {
    try{
        // const name = req.body.name;
         const email = req.body.email;
        // const phone = req.body.phone;
        // const birthDate=req.body.birthDate;
        // const gender=req.body.gender;
        // const joinDate=req.body.joinDate;
        // const username=req.body.username;
        // const password=req.body.password;
    
        const isValidated = validator.createValidation(req.body);
        const admin = await Admin.findOne({email})
        if(admin) return res.status(400).json({error: 'Email already exists'})
        if(isValidated.error) 
        {
            return  res.status(400).send({error: isValidated.error.details[0].message});
        }
        
        const a = await Admin.create(req.body);
        res.json({msg: "Admin created successfully", data: a});
    }catch(error){
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const admin = await Admin.findByIdAndRemove(id);
        res.json({msg: "Admin deleted successfully"});
    }catch(error){
        console.log(error);
    }
});

router.get('/getall/cases', async (req, res) => {
    try {
        const company = await Companys.find()
        console.log(company)
        res.json({ data: company })
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router