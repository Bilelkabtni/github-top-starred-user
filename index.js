const {getMostStarredUsers, config} = require('./githubMostStarredUsers');

const args = process.argv.slice(2),
    language = args[0], location = args[1];

getMostStarredUsers(language, location).then(finalResult => {
    console.log(`The top ${config.topUsers} starred users on github in ${location}`);
    console.log('*****************************');
    finalResult.forEach((user, i) => {
        console.log(`${i + 1}. ${user.login} has ${user.total_stars} ★ stars`);
    });
    console.log('*****************************');
}).catch(err => console.log(err));


