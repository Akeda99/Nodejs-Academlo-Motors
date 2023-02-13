const { Router } = require("express");
const { check } = require("express-validator");
const { findAllRepairs, createRepairs, updateRepair, deleteRepair, findRepair } = require("../controllers/repairs.controller");
const { validIfExistRepair } = require("../middlewares/repair.middleware");
const { validateFields } = require("../middlewares/validateField.middleware");

const router= Router();

router.get('', findAllRepairs)

router.get('/:id',validIfExistRepair, findRepair);

router.post('',[
    check('date', 'The date must be mandatory').not().isEmpty(),
    check('motorsNumber', 'The motorsNumber must be mandatory').not().isEmpty(),
    check('description', 'The description must be mandatory').not().isEmpty(),
    validateFields,
    ], createRepairs)

router.patch('/:id',validIfExistRepair, updateRepair)

router.delete('/:id',validIfExistRepair,deleteRepair);

module.exports={
    repairsRouter: router
}