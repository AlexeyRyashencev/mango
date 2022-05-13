import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3001;
app.use(express.static('public'));
app.use(cors());

/* mock initial deals values */
const getRndValue = (max = 600) => (Math.random() * max).toFixed(2);
const getRndDate = () => new Date(Date.UTC(2022, 1, 1, 2, Math.random() * 59, Math.random() * 59));
const getRndId = () => Math.random()
    .toString(16)
    .slice(2);

let dealsList = [];

while (dealsList.length < 50) {
    dealsList.push({
        id: getRndId(),
        date: getRndDate(),
        value: getRndValue()
    });
}

/* routes */
app.get('/', (request, response) => {
    response.sendFile(path.join(path.resolve(), './public/index.html'));
});

app.get('/api/deals', (request, response) => {
    const count = Number(request.query?.count) || 10;
    const page = Number(request.query?.page) || 0;
    const dealsSortList = dealsList
        .sort((a, b) => a.date - b.date)
        .slice(count * page, count * page + count);
    response.json(dealsSortList);
});

app.delete('/api/deal/:id', (request, response) => {
    // todo: add id validation
    dealsList = dealsList.filter((deal) => deal.id !== request.params['id']);
    response.send('ok');
});

app.listen(port, () => console.log(`Running on port ${port}`));
