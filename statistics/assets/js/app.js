// console.clear();
credits();

const headerText = document.querySelector('.header-text');
const headerDescription = document.querySelector('.header-description');
const instructions = document.querySelector('.slide article');
const fetchButton = document.querySelector('#fetch-button');
const statsTable = document.querySelector('#statistics');

fadeIn(headerText, 500);
fadeIn(headerDescription, 800);

fetchButton.addEventListener('click', async () => {
    fetchButton.textContent = 'Fetching...';

    try {
        await updateStatstics();
        fetchButton.textContent = 'Fetch';
        statsTable.classList.add('show');
    } catch(err) {
        fetchButton.textContent = 'Failed to fetch';
        await sleep(1000);
        fetchButton.textContent = 'Fetch';
        console.error('Could not copy: ', err);
    }
});

async function updateStatstics() {
    statsTable.classList.remove('show');
    statsTable.innerHTML = '';
    let statistics = await getStatistics();

    let header = document.createElement('span');
    header.textContent = 'Statistics';
    statsTable.appendChild(header);

    let table = document.createElement('table');
    statsTable.appendChild(table);

    for (let i = 0; i < statistics.length; i++) {
        let tableRow = document.createElement('tr');
        
        let date = document.createElement('td');
        date.textContent = statistics[i][0];

        let count = document.createElement('td');
        count.textContent = statistics[i][1];

        tableRow.appendChild(date);
        tableRow.appendChild(count);
        table.appendChild(tableRow);
    }
}