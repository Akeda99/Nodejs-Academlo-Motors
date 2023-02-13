const Repair = require("./repair.model");
const User = require("./user.model");

const initModel=()=>{
// 1 User tiene M repairs
User.hasMany(Repair);
Repair.belongsTo(User);
}