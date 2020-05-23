const express = require('express');

// =============== access databas using knex ===============
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then(account => {
        res.status(200).json({data: account})
    })
    .catch(error => {
        res.status(500).json({message: 'Soory', the_error: error})
    })
})

router.get('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
    .first()
    .then(element => {
        if(element){
            res.status(200).json({data: element})
        } else {
            res.status(404).json({message: 'account not found'})
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Sorry', the_error: error})
    })
})


router.post('/', (req, res) => {
    db('accounts').insert(req.body, 'id')
    .then(ids => {
        res.status(201).json({ results: ids})
    })
    .catch(error => {
        res.status(500)/json({message: 'Esorry', le_error: error})
    })
});

router.put('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
    .update(req.body)
    .then(count => {
        if(count) {
            res.status(200).json({message: 'post was updated'})
        } else {
            res.status(404).json({message: 'post not found'})
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Esorry', le_error: error})
    })
});

router.delete('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
    .delete()
    .then(count => {
        if(count){
            console.log(count)
            res.status(200).json({message: `deleted post`})
        } else {
            res.status(404).json({message: `post not found`})
        }
    })
    .catch(error => {
        res.status(500)/json({message: 'Esorry', le_error: error})
    })
});

module.exports = router;