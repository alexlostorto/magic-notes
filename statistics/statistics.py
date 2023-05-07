from src.stats import getStatistics
from src.tables import createTable
from src.graph import createGraph


def main():
    statistics = getStatistics()
    table = createTable('Statistics', statistics)
    graph = createGraph(statistics)

    # graph.display()
    table.display()


if __name__ == '__main__':
    main()
