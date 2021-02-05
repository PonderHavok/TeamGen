const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
let employees = [];
let employee;

const quest = [
  {
    type: "input",
    message: "What is the team manager's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the team manager's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the team manager's office number?",
    name: "officeNumber",
  },
  {
    type: "input",
    message: "What is the team manager's email address?",
    name: "email",
  },
  {
    type: "list",
    message: "Do you want to add a team member?",
    choices: ["Intern", "Engineer", "Done"],
    loop: false,
    name: "add",
  },
];
const intQuest = [
  {
    type: "input",
    message: "What is the intern's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the intern's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the intern's school?",
    name: "school",
  },
  {
    type: "input",
    message: "What is the intern's email address?",
    name: "email",
  },
  {
    type: "list",
    message: "Do you want to add a team member?",
    choices: ["Intern", "Engineer", "Done"],
    loop: false,
    name: "add",
  },
];
const engQuest = [
  {
    type: "input",
    message: "What is the engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the engineer's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the engineer's GitHub username?",
    name: "github",
  },
  {
    type: "input",
    message: "What is the engineer's email address?",
    name: "email",
  },
  {
    type: "list",
    message: "Do you want to add a team member?",
    choices: ["Intern", "Engineer", "Done"],
    loop: false,
    name: "add",
  },
];

const userPrompt = (quest) => {
  inquirer
    .prompt(quest)

    .then((response) => {
      switch (quest) {
        case engQuest:
          employee = new Engineer(
            response.name,
            response.id,
            response.email,
            response.github
          );
          employees.push(employee);
          break;

        case intQuest:
          employee = new Intern(
            response.name,
            response.id,            
            response.email,
            response.school
          );
          employees.push(employee);
          break;

        default:
          employee = new Manager(
            response.name,
            response.id,
            response.email,
            response.officeNumber
          );
          employees.push(employee);
      }

      switch (response.add) {
        case "Engineer":
          userPrompt(engQuest);
          break;

        case "Intern":
          userPrompt(intQuest);
          break;

        default:
          const team = render(employees);
          fs.writeFile(outputPath, team, (err) =>
            err ? err : console.log("File Successfully Written!")
          );
      }
    });
};

userPrompt(quest);
