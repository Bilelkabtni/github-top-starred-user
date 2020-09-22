const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

exports.config = CONFIG = {
    baseUrl: 'https://api.github.com/search/',
    topUsers: 5
};

const _requestApi = async (url) => {
    let headers = null;
    if (process.env.GITHUB_TOKEN) {
        headers = {'Authorization': `Basic  ${process.env.GITHUB_TOKEN}`};
    }
    return await fetch(url, {headers: headers})
        .then(response => response.json())
        .catch(err => console.log(err));
};

const _mapWithStarCount = (users) => {
    return users.items.map(user => {
        return _requestApi(user.repos_url).then((profile) => {
            let totalStars = profile.reduce((acc, obj) => acc + obj.stargazers_count, 0);
            return {login: user.login, total_stars: totalStars};
        }).catch(err => Promise.reject(' Authenticated requests get a higher rate limit.\n Please add your token to the .env file to get more access to the API.'));
    });
};

const sortAndSlice = (starredUsers) => {
    return starredUsers.sort((a, b) => {
        return b.total_stars - a.total_stars;
    }).slice(0, CONFIG.topUsers);
};

exports.getMostStarredUsers = (language, location) => {
    const requestUrl = `${CONFIG.baseUrl}users?q=location:${location}+language:${language}`;

    if (!language || !location) {
        return Promise.reject('Please provide us the location and the language.');
    }
    return _requestApi(requestUrl).then((users) => {
        return Promise.all(_mapWithStarCount(users));
    }).then(starredUsers => {
        return sortAndSlice(starredUsers, CONFIG.topUsers);
    });
};
