const apiKey = 'AmYqspkgCXZKJBiF6XaFVSZiAqYIMLhJ32DHuI8oSdIB2fTgt4146zwMIV0M1iBD';
let tokenLife = 0;
let authorisedToken = null;

function getTimestampInSeconds () {
    return Math.floor(Date.now() / 1000)
}

async function authorise() {
    timeAlive = getTimestampInSeconds() - tokenLife;
    
    if (timeAlive >= 1740) {
        let jsondata = {
            'key': apiKey
        }

        let settings = {
            "async": true,
            "crossDomain": true,
            "method": "POST",
            "headers": {
                'Content-Type': 'application/json'
            },
            'processData': false,
            body: JSON.stringify(jsondata)
        }

        let response = await (await fetch('https://realm.mongodb.com/api/client/v2.0/app/data-pddjp/auth/providers/api-key/login', settings)).json();
        authorisedToken = response.access_token;

        tokenLife = getTimestampInSeconds();
    }

    return authorisedToken;
}

async function getDatabase() {
    let token = await authorise();
    let url = 'https://data.mongodb-api.com/app/data-pddjp/endpoint/data/v1/action/find';

    const jsonData = {
        'database': 'users',
        'collection': 'user-data',
        'dataSource': 'Sparx',
    }

    const settings = {
        "async": true,
        "crossDomain": true,
        "method": "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        'processData': false,
        body: JSON.stringify(jsonData)
    }

    response = await (await fetch(url, settings)).json();

    if (response.documents.length == 0) {
        return False
    } else {
        return response.documents[0].users
    }
}
