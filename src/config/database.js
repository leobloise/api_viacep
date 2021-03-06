import sqlite from 'sqlite3'
import Database from './database/Database.js'

const database = new sqlite.Database('database.db', err => {
    if(err) {
        throw new Error(err)
    }
})

database.run(
    `CREATE TABLE IF NOT EXISTS ceps(
        cep TEXT PRIMARY KEY,
        cep_json TEXT NOT NULL
    );`
, err => {
    if(err) {
        throw new Error(err)
    }
    
})

let db = new Database(database)

export default db