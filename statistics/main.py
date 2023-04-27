from src.stats import getStatistics
from src.tables import createTable


def main():
    statistics = createTable('Statistics', getStatistics())

    statistics.display()


if __name__ == '__main__':
    main()
