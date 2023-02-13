const Repair= require('../models/repair.model')
const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')

exports.findAllRepairs=catchAsync(async(req,res,next)=>{
    const repairs= await Repair.findAll({
        where:{
            status: 'pending'
        }
    })
    res.status(200).json({
        status: 'success',
        message: 'The repairs were found successfully ',
        repairs,
    })
})
exports.findRepair=catchAsync(async(req,res,next)=>{
    const{id}=req.params;
    const repair=await Repair.findOne({
        where:{
            id,
            status: 'pending',
        },
    });
    res.status(201).json({
        status:'success',
        message: 'The repair was found successfully ',
        repair,
    })
})
exports.createRepairs= catchAsync(async(req,res,next)=>{

    const {date,userId,status, motorsNumber, description}=req.body;

    const newRepair= await Repair.create({
        date,
        userId,
        status,
        motorsNumber,
        description,
    })

    res.status(201).json({
        status: 'success',
        message: 'Repair created',
        newRepair,
    });
});
exports.updateRepair=catchAsync(async(req,res,next)=>{
    const {id}=req.params;
    const {status}=req.body;

    const repair=await Repair.findOne({
        where:{
            id,
            status:'pending'
        }
    })
    const updatedRepair= await repair.update({
        status
    })

    res.status(200).json({
        status: 'success',
        message: 'Repair updated',
        updatedRepair,
    })
})
exports.deleteRepair=catchAsync(async(req,res,next)=>{
    const {id}=req.params;
    const repair= await Repair.findOne({
        where:{
            id,
            status: 'pending',
        }
    });
    
    await repair.update({status:'cancelled'});
    res.json({
        status: 'success',
        message: 'Repair deleted',
    })
});