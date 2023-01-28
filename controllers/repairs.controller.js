const Repair= require('../models/repair.model')
const User = require('../models/user.model')

exports.findAllRepairs=async(req,res)=>{
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
}
exports.findRepair=async(req,res)=>{
    const{id}=req.params;
    const Repairs=await Repair.findOne({
        where:{
            id,
            status: 'pending',
        },
    });
    if(Repairs===null){
        return res.status(404).json({
            status:'error',
            message:'The repair was not found',
        });
    }
    res.status(201).json({
        status:'success',
        message: 'The repair was found successfully ',
        Repairs,
    })
}
exports.createRepairs= async(req,res)=>{

    const {date,userId,status}=req.body;

    const newRepair= await Repair.create({
        date,
        userId,
        status
    })

    res.status(201).json({
        status: 'success',
        message: 'Repair created',
        newRepair,
    });
};
exports.updateRepair=async(req,res)=>{
    const {id}=req.params;
    const {date,userId,status}=req.body;

    const Repairs=await Repair.findOne({
        where:{
            id,
            status:'pending'
        }
    })
    if(Repairs===null){
        return res.status(404).json({
            status:'error',
            message:'The Repair was not found',
        });
    }
    const updatedRepair= await Repairs.update({
        date,userId,status
    })

    res.status(200).json({
        status: 'success',
        message: 'Repair updated',
        updatedRepair,
    })
}
exports.deleteRepair=async(req,res)=>{
    const {id}=req.params;
    const Repairs= await Repair.findOne({
        where:{
            id,
            status: 'pending',
        }
    });
    if(!Repairs){
        return res.status(404).json({
            status:'error',
            message:'The repair was not found',
        });
    }
    
    await Repairs.update({status:'cancelled'});
    res.json({
        status: 'success',
        message: 'Repair deleted',
    })
}