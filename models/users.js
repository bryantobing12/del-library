const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Cards = require('../models/card_request');

const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        trim : true
    },
    role : {
        type : String,
        required : true,
        trim : true
    },
    nomorinduk : {
        type : String,
        required : true,
        trim : true
    },
    statusKeanggotaan : {
        type : Boolean,
        default : false,
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password : {
        type : String,
        unique : true, 
        required : true,
        trim : true,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error("The passowrd can't contain \"password\" string");
            } else if(value.length <= 6) { // or use min length 
                throw new Error("The password must be greater than 6")
            }
        }
    },
    jumlahPinjaman : {
        type : Number,
        default : 0,
        max : 3,
        validate(value) {
            if(value > 3) {
                throw new Error("Pinjaman maksimal 3 buku");
            } 
        }
    }
}, {
    timestamps : true
});

userSchema.virtual('card_requests', {
    ref : 'cards',
    localField : '_id',
    foreignField : 'owner'
});

userSchema.virtual('pinjam_buku', {
    ref : 'pinjambuku',
    localField : '_id',
    foreignField : 'owner'
});


userSchema.pre('save', async function(next) {
    const user = this;  

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;