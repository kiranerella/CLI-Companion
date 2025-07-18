const git = require('./git');
const docker = require('./docker');
const kubernetes = require('./kubernetes');
const terraform = require('./terraform');
const ansible = require('./ansible');

const allCommands = [...git, ...docker, ...kubernetes, ...terraform, ...ansible];

module.exports = allCommands.sort((a, b) => a.category.localeCompare(b.category));
