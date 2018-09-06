const verbs = [
    {
        Infinitive: 'to be',
        Past_Simple: 'was/were',
        Past_Participle: 'been',
        Translation: 'бути'
    },
    {
        Infinitive: 'to become',
        Past_Simple: 'became',
        Past_Participle: "become",
        Translation: 'ставати'
    },
    {
        Infinitive: 'to begin',
        Past_Simple: 'began',
        Past_Participle: 'begun',
        Translation: 'починати'
    },
    {
        Infinitive: 'to brake',
        Past_Simple: 'broke',
        Past_Participle: 'broken',
        Translation: 'ламати'
    },
    {
        Infinitive: 'to bring',
        Past_Simple: 'brought',
        Past_Participle: 'brought',
        Translation: 'приносити'
    },
    {
        Infinitive: 'to build',
        Past_Simple: 'built',
        Past_Participle: 'built',
        Translation: 'будувати'
    },
    {
        Infinitive: 'to buy',
        Past_Simple: 'bought',
        Past_Participle: 'bought',
        Translation: 'купувати'
    },
    {
        Infinitive: 'can',
        Past_Simple: 'could',
        Past_Participle: 'could',
        Translation: 'могти'
    },
    {
        Infinitive: 'to choose',
        Past_Simple: 'chose',
        Past_Participle: 'chosen',
        Translation: 'вибирати'
    },
    {
        Infinitive: 'to come',
        Past_Simple: 'came',
        Past_Participle: 'come',
        Translation: 'приходити'
    }
];

// make an array of headers of the table

const columns = [
    {
        key: 'Infinitive',
        title: 'Infinitive',
    },
    {
        key: 'Past_Simple',
        title: 'Past Simple',
    },
    {
        key: 'Past_Participle',
        title: 'Past Participle',
    },
    {
        key: 'Translation',
        title: 'Translation',
    },
];


// creating table and rows


// sending data to div with id="data-table"

const container = document.getElementById('data-table');
const search = document.getElementById('search-input');

search.addEventListener('keyup', handleChangeSearch, false);

renderTable(verbs);


function renderTable(data) {
    const table = document.createElement('table');
    const tr = table.insertRow(-1);

    columns.forEach(column => {
        const th = document.createElement('th');
        th.innerHTML = column.title;
        tr.appendChild(th);
    });

    // adding verbs to rows of table

    data.forEach(verb => {
        const tr = table.insertRow(-1);

        columns.forEach(column => {
            const tabCell = tr.insertCell(-1);
            tabCell.innerHTML = verb[column.key];
        });
    });

    container.innerHTML = '';
    container.appendChild(table);
}


function handleChangeSearch() {
    const filter = search.value.toUpperCase();

    const data = verbs.filter(verb => (
        filter.length < 3 ||
        columns.some(column => verb[column.key].toUpperCase().includes(filter))
    ));

    renderTable(data);
}