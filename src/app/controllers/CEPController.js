import axios from 'axios';
import express, { json } from 'express'
import db from '../../config/database.js'

db.on('cepfound', cep => {
    console.log(`Esse cep: ${cep} foi encontrado na base de dados`)
})

db.on('notfound', (cep) => {
    console.log(`Esse cep: ${cep} não foi encontrado na base de dados`)
})

db.on('sqlerror', err => {
    console.log(err)
})

class CEPController  {
    /**
     * 
     * @param {express.Request} req 
     */
    constructor(req) {
        this.req = req;
        this.validCepFormat = new RegExp(/^[0-9]{5}-[\d]{3}$/)
    }

    _validateCep(cep) {

        if( cep == "undefined" || cep == "" ) {
            return false
        }

        return this.validCepFormat.test(cep)

    }

    _getCEP() {

        const { cep } = this.req.query

        this.untreatedCep = cep

        const preTreatedCep = String(cep)

        if(this._validateCep(cep)) {
            return preTreatedCep.split('-')
            .join('');
        }

        return false

    }
    /**
     * @param {express.Response} res 
     */
    handle(res) { 
        
        const cep = this._getCEP()
    
        if(!cep) {
            
            return res.status(400)
            .json({
                "error": `${this.untreatedCep} não é um valor válido `
            })
            
        }

        db.checkCep(cep)
        .then(cep_json => {

            if(cep_json) {
                return res.status(200).json({
                    cep: cep,
                    Cep: JSON.parse(cep_json)
                })
            }

            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(axiosRes => {

                let data = axiosRes.data

                if(axiosRes.status == 200) {
                    
                    if(data.erro) {
                    
                        return res.status(404).json({
                            cep: `O cep ${cep} não foi encontrado ou não existe`
                        })
                    
                    }

                    db.createCep(cep, axiosRes.data)
                    .then(() => {
                        return res.status(200).json({
                                msg: 'Sucesso ao salvar o CEP no banco de dados',
                                cep: cep,
                                Cep: axiosRes.data
                            }
                        )
                    })
                    .catch(err => {
                        console.warn(err)
                        return res.status(200)
                        .json({
                            msg: 'Falhou ao salvar o CEP no banco de dados',
                            cep: cep,
                            Cep: data
                        })
                    })

                } else if(axiosRes.status != 200) {
                    
                    return res.status(500)
                    .json({
                        msg: 'Houve um erro interno. Por favor, contate o adm'
                    })
                
                }

            })

        })
        .catch(err => {
            console.log(err)
            return res.status(500)
                .json({
                msg: 'Houve um erro interno. Por favor, contate o adm'
            })
        }) 
    }

}

export default CEPController