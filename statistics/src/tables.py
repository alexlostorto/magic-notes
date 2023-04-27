# Pretty tables
from src.lib.prettytables import PrettyTable


def createTable(title, rows):
    table = PrettyTable(['Date', 'People Joined'], title=title, padding=1, separator='curvy')
    table.add_rows(rows)

    return table
