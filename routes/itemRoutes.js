const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/',async (req, res) => {
  try {
    Item.find()
      .sort({ date: -1 })
      .then(items => res.json(items));
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    Item.findById(req.params.id)
      .sort({ date: -1 })
      .then(items => res.json(items));
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      username: req.body.username
    });

    newItem.save().then(item => res.json(item));
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      username: req.body.username
    }, { new: true }).then(data => { res.send(data) })
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    Item.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;