import matplotlib.pyplot as plt


class Graph:
    def __init__(self, x, y):
        self.xTicks = x
        self.x = list(range(len(y)))
        self.y = y

    def display(self):
        plt.xticks(self.x, self.xTicks, rotation=90)
        plt.plot(self.x, self.y)
        plt.show()


def createGraph(statistics):
    xCoords = []
    yCoords = []

    for coordinate in statistics:
        xCoords.append(coordinate[0])
        yCoords.append(coordinate[1])

    return Graph(xCoords, yCoords)
