const { parse } = require('url');
const withAuth = require('../middlewares/withAuth');
const withUser = require('../middlewares/withUser');

module.exports = (router, nextApp) => {
    router.get(['/'], withUser, (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;
        let actualPage = pathname;

        const queryParams = {
            ...query,
            user: res.locals.user || null
        };

        nextApp.render(req, res, actualPage, queryParams);
    });
    
    router.get(['/wishes'], withAuth, (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;
        let actualPage = pathname;

        if (pathname === '/wishes') {
            actualPage = '/wishes/wishes'
        }

        const queryParams = {
            ...query,
            user: res.locals.user || null
        };
        nextApp.render(req, res, actualPage, queryParams);
    });
}