const fetch = require('node-fetch');

exports.config = CONFIG = {
    baseUrl: 'https://api.github.com/search/',
    topUsers: 5
};

const _requestApi = async (url) => {
    const headers = {'Authorization': 'Basic YmlsZWwua2FidG5pLmlzaUBnbWFpbC5jb206bWVyaWVta2FidG5pNDA='};

    return await fetch(url, {headers: headers})
        .then(response => response.json());
};

const _mapWithStarCount = (users) => {
    return users.items.map(user => {
        return _requestApi(user.repos_url).then((profile) => {
            let totalStars = profile.reduce((acc, obj) => acc + obj.stargazers_count, 0);
            return {login: user.login, total_stars: totalStars};
        });
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
