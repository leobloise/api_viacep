import express from 'express'
import { main } from './routes/CEP.js'

/**
 * @param {express.Application} app 
 */

export function App(app) {

    app.get('/cep', main)

}