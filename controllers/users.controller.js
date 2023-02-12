const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

exports.findAllUsers= catchAsync(async(req,res,next)=>{
    const users= await User.findAll({
        where:{
            status:'available',
        },
    });
    res.status(200).json({
        status:'success',
        message: 'The users were found successfully ',
        users,
    })
});
exports.findUser=catchAsync(async(req,res,next)=>{
    const {id}=req.params;
    const users=await User.findOne({
        where:{
            id,
            status: 'available',
        },
    });
    // if(users===null){
    //     return res.status(404).json({
    //         status:'error',
    //         message:'The user was not found',
    //     });
    // }
    res.status(201).json({
        status:'success',
        message: 'The User was found successfully ',
        users,
    })
});
exports.createUser= catchAsync(async(req,res,next)=>{

    const {name,email,password,role,status}=req.body;

    const newUser= await User.create({
        name,
        email,
        password,
        role,
        status
    })
    res.status(201).json({
        status:'success',
        message: 'User created',
        newUser,
    });
});

exports.updateUser=catchAsync(async(req,res,next)=>{

    const{id}=req.params;
    const {name,email,password,role,status}= req.body;

    const user=await User.findOne({
        where:{
            id,
            status: 'available',
        },
    });
    // if(!user){
    //     return res.status(404).json({
    //         status:'error',
    //         message:'The user was not found',
    //     });
    // }
   const updatedUser= await user.update({
    name,email,password,role,status
})

    res.status(200).json({
        status:'success',
        message: 'User updated',
        updatedUser, 
    })
});
exports.deleteUser=catchAsync(async(req,res,next)=>{
    const {id}=req.params;
    const users=await User.findOne({
        where:{
            id,
            status: 'available',
        },
    });
    // if(!users){
    //     return res.status(404).json({
    //         status:'error',
    //         message:'The user was not found',
    //     });
    // }
    await users.update({status:'not available'});
    res.status(200).json({
        status:'success',
        message: 'User deleted',
        
    })
});