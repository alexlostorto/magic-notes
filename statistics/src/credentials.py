# Relative files
import os

# Environment variables
from dotenv import load_dotenv


load_dotenv()


def getUsername():
    return os.getenv('USER')


def getKey():
    return os.getenv('KEY')
