const express = require('express');
const cache = require('../routeCache');
const router = express.Router();
const googleTranslate = require('@vitalets/google-translate-api');

router.get('/translate', cache(10), async (req, res) => {
    let queryParamter = req.query;

    let output = {};
    try {
        const response = await googleTranslate(queryParamter.textFormat, { to: queryParamter.targetLanguage });
        output.translatedText = response.text;
        output.fromLanguage = response.from.language.iso;
    } catch (error) {
        console.log(error);
    }
    res.status(200).json({
        success: true,
        data: output,
    });
});


router.get('/test1', async (req,res) => {
    let output = {};
    try {
        const response = await googleTranslate('How u doing?', { to: 'en'});

        output.translatedText = response.text;
        output.fromLanguage = response.from.language.iso;
    } catch (error) {
        console.log(error);
    }
    res.status(200).json({
        success: true,
        data: output,
    });
});

router.get('/test2', async (req, res) => {
    let queryParamter = req.query;

    let output = {};
    try {
        const response = await googleTranslate(queryParamter.textFormat, { to: queryParamter.targetLanguage });

        output.translatedText = response.text;
        output.fromLanguage = response.from.language.iso;
    } catch (error) {
        console.log(error);
    }
    res.status(200).json({
        success: true,
        data: output,
    });
});

module.exports = router;