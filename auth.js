const ActiveDirectory = require('activedirectory2');


module.exports.login = async function(username, password) {

    async function ldapAuthenticate(username, password) {
        let config = {
            url: 'ldap:/your.domain.com',
            baseDN: 'dc=your,dc=domain,dc=com',
        };
        let ad = new ActiveDirectory(config);

        // promisify function
        return new Promise(function (resolve, reject) {
            ad.authenticate(username, password, function (err, auth) {
                if (err) {
                    reject(err);
                }
                if (auth) {
                    resolve(auth);
                }
            })
        });
    }

    try {
        let result = await ldapAuthenticate(username, password);
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}