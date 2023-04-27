# [topleft, topmiddle, topright, centre, bottomleft, bottommiddle, bottomright, horizontal, vertical]
separators = {
    'default': ['+', '+', '+', '+', '+', '+', '+', '+', '+', '─', '│'],
    'curvy': ['╭', '┬', '╮', '├', '┼', '┤', '╰', '┴', '╯', '─', '│']
}

topLeft = 0
topMiddle = 1
topRight = 2
middleLeft = 3
centre = 4
middleRight = 5
bottomLeft = 6
bottomMiddle = 7
bottomRight = 8
horizontal = 9
vertical = 10


def displayTable(self):
    maxLengths = getMaxLengths(self)
    separator = separators.get(self.separator, separators['curvy'])

    table = []
    table.append(createDivider(maxLengths, separator[topLeft], separator[horizontal], separator[topRight], separator[horizontal]))
    table.append(createTitle(maxLengths, self.title, separator[vertical]))
    table.append(createDivider(maxLengths, separator[middleLeft], separator[topMiddle], separator[middleRight], separator[horizontal]))
    table.append(createRow(maxLengths, self.header, separator[vertical]))
    table.append(createDivider(maxLengths, separator[middleLeft], separator[centre], separator[middleRight], separator[horizontal]))

    for row in self.contents:
        table.append(createRow(maxLengths, row, separator[vertical]))

    table.append(createDivider(maxLengths, separator[bottomLeft], separator[bottomMiddle], separator[bottomRight], separator[horizontal]))

    return table


def getMaxLengths(self):
    maxLengths = [len(x) + self.padding * 2 for x in self.header]

    for row in self.contents:
        for i in range(len(row)):
            if len(str(row[i])) + self.padding * 2 > maxLengths[i]:
                maxLengths[i] = len(str(row[i])) + self.padding * 2

    return maxLengths


def createDivider(boxLengths, startCharacter, middleCharacter, endCharacter, horizontal):
    line = f"{startCharacter}"
    temp = []

    for length in boxLengths:
        temp.append(horizontal * length)

    line += middleCharacter.join(temp)

    return line + endCharacter


def createRow(boxLengths, row, vertical):
    line = ''

    for i in range(len(boxLengths)):
        spaces = boxLengths[i] - len(str(row[i]))
        back = (spaces + 1) // 2
        front = back - spaces % 2
        line += vertical + back * ' ' + str(row[i]) + front * ' '

    return line + vertical


def createTitle(boxLengths, title, vertical):
    spaces = sum(boxLengths) + len(boxLengths) - 1 - len(title)
    back = (spaces + 1) // 2
    front = spaces - back
    line = vertical + back * ' ' + title + front * ' ' + vertical

    return line
