#! /usr/bin/env node

import inquirer from "inquirer"

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];
    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const persons = new Person();

const programStart = async (persons: Person) => {
    do{
        const answer = await inquirer.prompt({
            name: "selection",
            message: "Whom would you like to interact with?",
            type: "list",
            choices: ["Staff", "Student", "Exit..."]
        });

        if(answer.selection === "Staff"){
            console.log("You approach the staff room. Feel free to ask question you have.");
        }else if(answer.selection === "Student"){
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: "Enter the name of student you wish you to angage with:"
            });

            const student = persons.students.find(value => value.name === ans.student);
            if(!student){
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(`Greeting! I am ${name.name}. It's a pleasure to meet you!`);
                console.log("A new student has been added to the roster.");
                console.log("Current list of students:");
                persons.students.forEach(student => console.log(student.name));
            }else{
                console.log(`Hello again! I am ${student.name}. Nice to see you back!`);
                console.log("List of existing students:");
                persons.students.forEach(student => console.log(student.name))
            }
        }else if(answer.selection === "Exit..."){
            console.log("Exiting the program... Goodbye!");
            process.exit();
        }
    }while (true);
};

programStart(persons)