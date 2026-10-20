const fs = require('fs');

const initialPeople = [
    { id: "1", firstName: "Ahmed", lastName: "Ali", age: 25, city: "Cairo" },
    { id: "2", firstName: "Mona", lastName: "Hassan", age: 30, city: "Alexandria" },
    { id: "3", firstName: "Khaled", lastName: "Mohamed", age: 22, city: "Giza" },
    { id: "4", firstName: "Fatma", lastName: "Ibrahim", age: 27, city: "Aswan" },
    { id: "5", firstName: "Omar", lastName: "Youssef", age: 35, city: "Luxor" },
    { id: "6", firstName: "Nour", lastName: "Tarek", age: 24, city: "Mansoura" },
    { id: "7", firstName: "Yasmine", lastName: "Samir", age: 29, city: "Tanta" },
    { id: "8", firstName: "Ziad", lastName: "Mahmoud", age: 28, city: "Ismailia" },
    { id: "9", firstName: "Salma", lastName: "Adel", age: 26, city: "Suez" },
    { id: "10", firstName: "kariem", lastName: "Nasser", age: 31, city: "Fayoum" }
];

const loadPeople = () => {
    try {
        const dataBuffer = fs.readFileSync('people.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        savePeople(initialPeople);
        return initialPeople;
    }
};

const savePeople = (people) => {
    fs.writeFileSync('people.json', JSON.stringify(people, null, 2));
};

const addPerson = (id, firstName, lastName, age, city) => {
    const people = loadPeople();
    
    if (people.length >= 10) {
        console.log('Error: Maximum limit of 10 people reached. You cannot add more.');
        return;
    }

    const duplicateId = people.find(p => p.id === id);
    if (duplicateId) {
        console.log('Error: ID already exists!');
        return;
    }

    people.push({ id, firstName, lastName, age, city });
    savePeople(people);
    console.log('Person added successfully.');
};

const listPeople = () => {
    const people = loadPeople();
    console.log(people);
};

const readPerson = (id) => {
    const people = loadPeople();
    const person = people.find(p => p.id === id);
    if (person) {
        console.log(person);
    } else {
        console.log('Person not found.');
    }
};

const listFullNamesAndCities = () => {
    const people = loadPeople();
    people.forEach((p, index) => {
        console.log(`${index + 1}. Full Name: ${p.firstName} ${p.lastName} | City: ${p.city}`);
    });
};

const removePerson = (id) => {
    const people = loadPeople();
    const filteredPeople = people.filter(p => p.id !== id);

    if (people.length === filteredPeople.length) {
        console.log('Error: Person not found.');
    } else {
        savePeople(filteredPeople);
        console.log('Person removed successfully.');
    }
};

const removeAllPeople = () => {
    savePeople([]);
    console.log('All people have been deleted.');
};

module.exports = {
    addPerson,
    listPeople,
    readPerson,
    listFullNamesAndCities,
    removePerson,
    removeAllPeople
};