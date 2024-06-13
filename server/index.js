import express from 'express'
import cors from 'cors'
import { getAllPeople } from './database.js'

const app = express() 

app.use(express.json()) 
app.use(cors())

app.use((err, req, res, next) => { // express 5 middleware
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.get("/people", async (req, res) => { // /people?num=${numPeople}
    const people = await getAllPeople(20) // replace 20 with req.limit once frontend fetch is updated
    res.send(people)
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})

