const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const escapeRegex = require('../function/search');

// models
const Article = require('../models/article');

router.get('/article', async (req, res) => {
    try {
        if(!req.query.keywords) {
            var query = parseInt(req.query.limit);
            var limit = query;
            if(!query) {
                limit = 9;
            }
            const article = await Article.find({}).limit(limit);
            const count = await Article.countDocuments();
            article.forEach((a) => {
                a.tanggal = moment(a.createdAt).tz('Asia/Jakarta').locale('id').format('LL').split(' ');
                a.tanggalUpdate = moment(a.updatedAt).tz('Asia/Jakarta').locale('id').format('LLLL');
            });
            res.render('pages/article', {
                title : "Article",
                data : article,
                count,
                limit,
                keywords : req.query.keywords,
                articleDelete : req.flash('articleDelete'),
                articleDetailError : req.flash('articleDetailError')
            });
        } else {
            var query = parseInt(req.query.limit);
            var limit = query;
            if(!query) {
                limit = 9;
            }
            var regex = new RegExp(escapeRegex(req.query.keywords), 'gi');
            const article = await Article.find({ $or : [{ judul : regex }, { category : regex }, { text : regex }]});
            const articleData = await Article.find({
                $or : [
                    {
                        judul : regex 
                    },
                    {
                        category : regex
                    },
                    {
                        text : regex
                    }
                ]
            }).limit(limit);
            const count = article.length;
            articleData.forEach((a) => {
                a.tanggal = moment(a.createdAt).tz('Asia/Jakarta').locale('id').format('LL').split(' ');
                a.tanggalUpdate = moment(a.updatedAt).tz('Asia/Jakarta').locale('id').format('LLLL');
            });
            res.render('pages/article', {
                title : "Article",
                data : articleData,
                count,
                keywords : req.query.keywords,
                limit,
                articleDelete : req.flash('articleDelete'),
                articleDetailError : req.flash('articleDetailError')
            });
            
        }
    } catch (e) {
        console.log("Error " + e);
    }

});

router.get('/article-detail/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        article.textFormatted = article.text.split('\n');
        article.tanggal = moment(article.createdAt).tz('Asia/Jakarta').locale('id').format('LL').split(' ');
        article.tanggalUpdate = moment(article.updatedAt).tz('Asia/Jakarta').locale('id').format('LLLL');
        
        res.render('pages/articledetail', {
            title : "Article - Detail",
            data : article,
            successArticle : req.flash('successArticle'),
            updateArticle : req.flash('updateArticle'),
            error : req.flash('error')
        });
    } catch(e) {
        req.flash('articleDetailError' ,'Artikel tidak ditemukan');
        res.redirect('/article');
    }
});

router.get('/getarticle-image/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if(!article || !article.gambar) {
            throw new Error();
        }
        res.set('Content-Type' , 'image/webp');
        res.send(article.gambar);
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;