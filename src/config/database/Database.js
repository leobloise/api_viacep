import sqlite3 from 'sqlite3'
import EventEmitter from 'events'

class Database extends EventEmitter {
    /**
     * 
     * @param {sqlite3.Database} database 
     */
    constructor(database) {
        super()
        this.db = database;
    }

    createCep(cep, json_cep) {

        return new Promise((resolve, reject) => {

            if( typeof cep !== 'string' || typeof json_cep !== 'object' ) {
                throw new Error('CEP deve ser um texto e json_cep deve ser um objeto válido')
            }

            json_cep = JSON.stringify(json_cep)
    
            let steatment = this.db.prepare('INSERT INTO ceps(cep, cep_json) VALUES ( ?, ? )')
            
            steatment.run(cep, json_cep, (err) => {
                if(err) {
                    reject(err)
                } 
            });
            
            steatment.finalize(err => {
                if(err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        
        })

    }

    checkCep(cep) {

        return new Promise((resolve, reject) => {

            if(typeof cep !== 'string')
                throw new Error('O cep deve ser uma string')
            
            let steatment = this.db.prepare('SELECT cep_json FROM ceps WHERE cep = ?')

            steatment.get(cep, (err, row) => {
                
                if(err) {
                    this.emit('sqlerror', err)
                    return reject(err)
                } 

                if( typeof row === 'undefined' ) {
                    this.emit('notfound', cep)
                    return resolve(false)
                } else {
                    this.emit('cepfound', cep)
                    return resolve(row.cep_json);
                }

            });

        })

    }

}

export default Database