const express = require('express');
const Hero = require('../models/hero');
const router = express.Router();

router.get('/', async (req, res) => {
    let heroes = await Hero.find();
    res.send(heroes);
});



router.get('/:heroId', async (req, res) => {
    let hero = await Hero.findById(req.params.heroId);

    if (!hero) {
        return res.sendStatus(404).send("The given Id does not exist on our server");
    }

    res.send(hero);
});

router.post('/', async (req, res) => {
    if (!req.body.heroName) {
        return res.status(400).send("Not all mandatory values have been set!");
    }

    try {
        let heroToBeAddedToDb = new Hero({
            name: req.body.heroName,
            birthname: req.body.birthname,
            movies: req.body.movies,
            likeCount: req.body.likeCount,
            imgUrl: req.body.imgUrl,
            deceased: req.body.deceased

        });

        heroToBeAddedToDb = await heroToBeAddedToDb.save();
        res.send(heroToBeAddedToDb);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

/*router.put('/:heroId', async (req, res) => {
    let hero = await Hero.findById(req.params.heroId);

    if (!hero) {
        return res.status(404).send("The given Id does not exist on our server");
    }

    if (!req.body.heroName) {
        return res.status(400).send("Not all mandatory values have been set!");
    }

    hero.set({ name: req.body.heroName });
    hero = await hero.save();
    res.send(hero);
});*/

router.put('/:heroId', async (req, res) => {
    let hero = await Hero.findOneAndUpdate(
        { _id: req.params.heroId },
        { $set: { likeCount: req.body.likeCount } },
        { new: true, useFindAndModify: false }
    );
    res.send(hero);
});

router.delete('/:heroId', async (req, res) => {
    let hero = await Hero.findOneAndDelete({ _id: req.params.heroId });

    if (!hero) {
        return res.status(404).send("The given Id does not exist on our server");
    }

    res.send(hero);
});

module.exports = router;