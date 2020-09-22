const {getMostStarredUsers, config} = require('./githubMostStarredUsers');

describe('GithubTopRanked', () => {
    it('should create the instance', () => {
        expect(getMostStarredUsers).toBeTruthy();
    });

    it('should get tow params the location & language', async () => {
        await getMostStarredUsers('javascript').catch(err => {
            expect(err).toEqual('Please provide us the location and the language.');
        });
    });

    it('should get top five ranked user', async () => {
        await getMostStarredUsers('javascript', 'munich').then(finalResult => {
            expect(finalResult.length).toEqual(5);
        });
    });

    it('should get top tow ranked user', async () => {
        config.topUsers = 2;
        await getMostStarredUsers('javascript', 'munich').then(finalResult => {
            expect(finalResult.length).toEqual(2);
        });
    });
});



