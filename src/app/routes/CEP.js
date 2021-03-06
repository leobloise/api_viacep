import express from 'express'
import CEPController from '../controllers/CEPController.js';

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export function main(req, res) {

    let controller = new CEPController(req)

    return controller.handle(res)

}