const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const data = require('./data');

yargs(hideBin(process.argv))
    .command({
        command: 'add',
        describe: 'Add a new person',
        builder: {
            id: { describe: 'Person ID', demandOption: true, type: 'string' },
            firstName: { describe: 'First Name', demandOption: true, type: 'string' },
            lastName: { describe: 'Last Name', demandOption: true, type: 'string' },
            age: { describe: 'Age', demandOption: true, type: 'number' },
            city: { describe: 'City', demandOption: true, type: 'string' }
        },
        handler(argv) {
            data.addPerson(argv.id, argv.firstName, argv.lastName, argv.age, argv.city);
        }
    })

    .command({
        command: 'list',
        describe: 'View all people',
        handler() {
            data.listPeople();
        }
    })

    .command({
        command: 'read',
        describe: 'View a specific person by ID',
        builder: {
            id: { describe: 'Person ID', demandOption: true, type: 'string' }
        },
        handler(argv) {
            data.readPerson(argv.id);
        }
    })

    .command({
        command: 'show-info',
        describe: 'View full name and city of each person',
        handler() {
            data.listFullNamesAndCities();
        }
    })

    .command({
        command: 'remove',
        describe: 'Delete a specific person by ID',
        builder: {
            id: { describe: 'Person ID', demandOption: true, type: 'string' }
        },
        handler(argv) {
            data.removePerson(argv.id);
        }
    })

    .command({
        command: 'remove-all',
        describe: 'Delete all people',
        handler() {
            data.removeAllPeople();
        }
    })
    .parse();