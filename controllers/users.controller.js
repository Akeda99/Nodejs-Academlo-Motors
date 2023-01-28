const User = require("../models/user.model");

exports.findAllUsers= async(req,res)=>{
    const Users= await User.findAll({
        where:{
            status:'available',
        },
    });
    res.status(200).json({
        status:'success',
        message: 'The Users were found successfully ',
        Users,
    })
};
exports.findUser=async(req,res)=>{
    const {id}=req.params;
    const Users=await User.findOne({
        where:{
            id,
            status: 'available',
        },
    });
    if(Users===null){
        return res.status(404).json({
            status:'error',
            message:'The user was not found',
        });
    }
    res.status(201).json({
        status:'success',
        message: 'The User was found successfully Method get',
        Users,
    })
}
exports.createUser= async(req,res)=>{

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
};

exports.updateUser=async(req,res)=>{

    const{id}=req.params;
    const {name,email,password,role,status}= req.body;

    const Users=await User.findOne({
        where:{
            id,
            status: 'available',
        },
    });
    if(!Users){
        return res.status(404).json({
            status:'error',
            message:'The user was not found',
        });
    }
   const updatedUser= await Users.update({
    name,email,password,role,status
})

    res.status(200).json({
        status:'success',
        message: 'User updated',
        updatedUser, 
    })
};
exports.deleteUser=async(req,res)=>{
    const {id}=req.params;
    const Users=await User.findOne({
        where:{
            id,
            status: 'available',
        },
    });
    if(!Users){
        return res.status(404).json({
            status:'error',
            message:'The user was not found',
        });
    }
    await Users.update({status:'not available'});
    res.status(200).json({
        status:'success',
        message: 'User deleted',
        
    })
}