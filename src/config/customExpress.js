import express from 'express'
import {App} from '../app/index.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json());

App(app)

export default app