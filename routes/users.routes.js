const { Router } = require("express");
const { findAllUsers, createUser, updateUser, findUser, deleteUser } = require("../controllers/users.controller");

const router= Router();



router.get('', findAllUsers);

router.get('/:id', findUser);

router.post('', createUser);

router.patch('/:id',updateUser);

router.delete('/:id',deleteUser);


module.exports={
    usersRouter: router
}