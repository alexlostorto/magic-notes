async function getStatistics() {
    const data = await getDatabase();
    const accountCreations = returnDates(data);
    const creationStatistics = returnCreationCount(accountCreations);

    return creationStatistics
}

function returnCreationCount(accountCreations) {
    const earliestDate = new Date(accountCreations[0]);
    const latestDate = new Date();
    const dates = getDatesInRange(earliestDate, latestDate);

    let creationStatistics = [];

    for (let i = 0; i < accountCreations.length; i++) {
        let date = accountCreations[i];

        if (creationStatistics.length != 0 && date == creationStatistics[creationStatistics.length-1][0]) {
            creationStatistics[creationStatistics.length-1][1] += 1
        } else {
            creationStatistics.push([date, 1])
        }
    }

    for (let i = 0; i < dates.length; i++) {
        let date;

        try {
            date = creationStatistics[i][0]
        } catch {
            creationStatistics.splice(i, 0, [dates[i], 0])
            continue
        }

        if (dates[i] != date) {
            creationStatistics.splice(i, 0, [dates[i], 0])
        }
    }

    return creationStatistics
}


Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDatesInRange(startDate, stopDate) {
    let dates = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dates.push(new Date (currentDate).toISOString().substring(0, 10));
        currentDate = currentDate.addDays(1);
    }
    return dates;
}


function returnDates(data) {
    let dates = [];

    for (let key in data) {
        let date;

        date = data[key].created;

        if (date == undefined || date.length == 0) {
            continue
        } else {
            dates.push(date.substring(0, 10))
        }
    }

    return dates
}
