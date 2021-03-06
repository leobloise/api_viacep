import express from 'express'
import {App} from '../app/index.js'

const app = express()

app.use(express.json());

App(app)

export default app