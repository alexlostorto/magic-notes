# MongoDB
import pymongo

from src.credentials import getUsername, getKey


def getDatabase(databaseName, collectionName, log=True):
    username = getUsername()
    key = getKey()

    uri = f'mongodb+srv://{username}:{key}@sparx.iemgfgr.mongodb.net/test'
    client = pymongo.MongoClient(uri, serverSelectionTimeoutMS=5000)
    database = client[databaseName]
    collection = database[collectionName]
    data = [result for result in collection.find()][0]

    try:
        if log:
            print(client.server_info())
        return data
    except Exception:
        print("Unable to connect to the server.")
