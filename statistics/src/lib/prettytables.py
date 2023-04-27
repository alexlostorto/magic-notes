from src.lib.display import displayTable


class PrettyTable:
    def __init__(self, columns, title='Table', padding=1, separator='default'):
        self.title = title
        self.header = columns
        self.contents = []
        self.padding = padding
        self.columns = len(columns)
        self.rows = 0
        self.separator = separator

    def add_row(self, row):
        if len(row) != self.columns:
            raise ValueError("Length of rows need to be equal to the number of columns")

        self.contents.append(row)

    def add_rows(self, rows):
        for row in rows:
            if len(row) != self.columns:
                raise ValueError("Length of rows need to be equal to the number of columns")

            if not isinstance(row, list):
                raise ValueError("Each row has to be a list")

            self.contents.append(row)

    def display(self):
        for row in displayTable(self):
            print(row)

    def __str__(self):
        return '\n'.join(displayTable(self))
