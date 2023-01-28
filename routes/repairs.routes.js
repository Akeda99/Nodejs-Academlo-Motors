const { Router } = require("express");
const { findAllRepairs, createRepairs, updateRepair, deleteRepair, findRepair } = require("../controllers/repairs.controller");

const router= Router();

router.get('', findAllRepairs)

router.get('/:id', findRepair);

router.post('', createRepairs)

router.patch('/:id', updateRepair)

router.delete('/:id',deleteRepair);

module.exports={
    repairsRouter: router
}