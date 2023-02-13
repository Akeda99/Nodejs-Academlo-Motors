const Repair= require('../models/repair.model')
const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')

exports.findAllRepairs=catchAsync(async(req,res,next)=>{
    const Repairs= await Repair.findAll({
        where:{
            status: 'pending'
        }
    })
    res.status(200).json({
        status: 'success',
        message: 'The repairs were found successfully ',
        Repairs,
    })
})
exports.findRepair=catchAsync(async(req,res,next)=>{
    const{id}=req.params;
    const Repairs=await Repair.findOne({
        where:{
            id,
            status: 'pending',
        },
    });
    // if(Repairs===null){
    //     return res.status(404).json({
    //         status:'error',
    //         message:'The repair was not found',
    //     });
    // }
    res.status(201).json({
        status:'success',
        message: 'The repair was found successfully ',
        Repairs,
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

    const Repairs=await Repair.findOne({
        where:{
            id,
            status:'pending'
        }
    })
    // if(Repairs===null){
    //     return res.status(404).json({
    //         status:'error',
    //         message:'The Repair was not found',
    //     });
    // }
    const updatedRepair= await Repairs.update({
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
    const Repairs= await Repair.findOne({
        where:{
            id,
            status: 'pending',
        }
    });
    // if(!Repairs){
    //     return res.status(404).json({
    //         status:'error',
    //         message:'The repair was not found',
    //     });
    // }
    
    await Repairs.update({status:'cancelled'});
    res.json({
        status: 'success',
        message: 'Repair deleted',
    })
});