# To work with dates
from datetime import datetime, timedelta

from src.database import getDatabase


def getStatistics():
    data = getDatabase('users', 'user-data', log=False)['users']
    accountCreations = [returnDate(value) for value in data.values()]
    accountCreations = list(filter(lambda value: len(value) != 0, accountCreations))
    creationStatistics = returnCreationCount(accountCreations)

    return creationStatistics


def returnCreationCount(accountCreations):
    earliestDate = datetime.strptime(accountCreations[0], "%Y-%m-%d")
    latestDate = datetime.strptime(accountCreations[-1], "%Y-%m-%d")
    dates = getDatesInRange(earliestDate, latestDate)

    creationStatistics = []

    for date in accountCreations:
        if len(creationStatistics) != 0 and date == creationStatistics[-1][0]:
            creationStatistics[-1][1] += 1
        else:
            creationStatistics.append([date, 1])

    for i in range(len(dates)):
        if dates[i] != creationStatistics[i][0]:
            creationStatistics.insert(i, [dates[i], 0])

    return creationStatistics


def getDatesInRange(startDate, endDate):
    delta = timedelta(days=1)
    dates = []

    while startDate <= endDate:
        dates.append(startDate.isoformat()[0:10])
        startDate += delta

    return dates


def returnDate(value):
    date = value.get('created', '')

    if date == '' or len(date) == 0:
        return ''
    else:
        return date[0:10]
