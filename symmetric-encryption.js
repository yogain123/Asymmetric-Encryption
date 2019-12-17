const crypto = require('crypto');

module.exports = (function(){
let text = "My name is yogendra Saxena";

// Creating Random key for Symmetric Encryption
let key = crypto.randomBytes(16);
console.log({key});
let encrypt = crypto.createCipher("aes-256-ctr",key).update(text, 'utf-8','hex');
console.log({encrypt});
let decrypt = crypto.createDecipher("aes-256-ctr",key).update(encrypt,'hex', 'utf-8');
console.log({decrypt});
})()