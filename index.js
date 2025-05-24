import express from 'express'
import 'dotenv/config'

const app = express();

const port = process.env.PORT || 7890

app.use(express.json()) // any data that are coming as json format from frontend, we accepting the data

let appData = [];
let nextId = 1;

// goal
/**
 * add,list,update,delete app data
 */


// creating
app.post('/data', (req, res) => {
    const { name, price } = req.body //destructuring obj
    const newappData = { id: nextId++, name, price }
    appData.push(newappData);
    res.status(201).send(newappData)
})


// listing
app.get('/datas', (req, res) => {
    res.status(200).send(appData)
})

// listing by id
app.get('/datas/:id', (req, res) => {
    const data = appData.find(entity => entity.id === parseInt(req.params.id))
    if (!data) {
        return res.status(404).send("Entity not found")
    } else {
        res.status(200).send(data)
    }
})

// update
app.put('/datas/:id', (req, res) => {
    const data = appData.find(entity => entity.id === parseInt(req.params.id))
    if (!data) {
        return res.status(404).send("Entity not found")
    }
    const { name, price } = req.body
    data.name = name
    data.price = price
    res.status(200).send(data)
})

// delete
app.delete('/datas/:id', (req, res) => {
    const index = appData.findIndex(entity => entity.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).send('Entity not found');
    }

    appData.splice(index, 1);
    return res.status(200).send('Entity deleted'); // 204 should not have a response body
});


app.listen(port, () => {
    console.log(`Server is listening on ${port}...`);
})