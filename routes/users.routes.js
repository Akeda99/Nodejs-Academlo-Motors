const { Router } = require("express");
const { check } = require("express-validator");
const { findAllUsers, createUser, updateUser, findUser, deleteUser } = require("../controllers/users.controller");
const { validIfExistUser, validIfExistUserEmail } = require("../middlewares/user.middleware");
const { validateFields} = require("../middlewares/validateField.middleware");

const router= Router();





router.get('', findAllUsers);

router.get('/:id',validIfExistUser, findUser);

router.post('', [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validIfExistUserEmail,
    validateFields,
    ],createUser);

router.patch('/:id',[
check('name', 'The name must be mandatory').not().isEmpty(),
check('email', 'The email must be mandatory').not().isEmpty(),
check('password', 'The password must be mandatory').not().isEmpty(),
check('email', 'The email must be a correct format').isEmail(),
validIfExistUser,
validateFields,
],
updateUser);

router.delete('/:id',validIfExistUser,deleteUser);


module.exports={
    usersRouter: router,
}