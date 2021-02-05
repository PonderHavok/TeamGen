const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.getofficeNumber = function () {
      return this.officeNumber;
    };
    this.getRole = function () {
      return "Manager";
    };
  }
}

module.exports = Manager;
