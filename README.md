# Github top five starred users

Node application using the GitHub API [Github doc](https://docs.github.com/en/github) to find the 5 most highly starred developers in your city who use specified programming language. The rank is calculated as the sum of all-stars for all their projects
## Installation
This project requires **NodeJS**
Please use node js and run npm install.


**getMostStarredUsers** will return a Promise
**config** is used to set custom config such as requestUrl and number of a listed starred users

```javascript
const {getMostStarredUsers, config} = require('./githubMostStarredUsers');
// to change config Exmpl:
config.topUsers = 5;

getMostStarredUsers(language, location).then(data => {
  // data contain the sorted top starred users
}).catch(err => console.log(err));
```

The **getMostStarredUsers** method can accept optional config object by changing the **config** variables:
| Option | Type | Description |
| ------ | ---- | ----------- |
|`baseUrl`|string| the base URL of the GitHub API example   "**https://api.github.com/search/**" |
|`topUsers`| number| by default, it will return the most top 5 starred user in your city 

## Testing
Please run npm test.

## Linting
Please run npm lint.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://github.com/Bilelkabtni/github-top-ranked-user/blob/master/LICENSE)