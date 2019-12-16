const crypto = require('crypto');
let text = "My name is yogendra Saxena";

// ================ Symetric Encryption Start ==================

// Creating Random key for Symmetric Encryption
let key = crypto.randomBytes(16);
console.log({key});
let encrypt = crypto.createCipher("aes-256-ctr",key).update(text, 'utf-8','hex');
console.log({encrypt});
let decrypt = crypto.createDecipher("aes-256-ctr",key).update(encrypt,'hex', 'utf-8');
console.log({decrypt});

// ================ Symetric Encryption Ends ==================

// ================= Encoding and Decoding Starts ====================
let p = "yoyo";
let encoded = (Buffer.from(p,"utf8").toString('base64'));
console.log({encoded});
let decoded = (Buffer.from(encoded,"base64").toString('utf8'));
console.log({decoded});

// ================= Encoding and Decoding Ends ====================


// ================= Asymetric/Public Encryption Starts ==============

var path = require("path");
var fs = require("fs");
const passphrase = "mySecret"

var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toDecrypt, "base64");
    //var decrypted = crypto.privateDecrypt(privateKey, buffer);
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey.toString(),
            passphrase: passphrase,
        },
        buffer,
    )
    return decrypted.toString("utf8");
};

const { writeFileSync } = require('fs')
const { generateKeyPairSync } = require('crypto')

// ================= Asymetric/Public Encryption Ends ==============

// ================ Generating Public and Private key pairs Starts =========

function generateKeys() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', 
    {
            modulusLength: 4096,
            namedCurve: 'secp256k1', 
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'     
            },     
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: passphrase
            } 
    });

    writeFileSync('private.pem', privateKey)
    writeFileSync('public.pem', publicKey)
}

// ================ Generating Public and Private key pairs Starts =========

generateKeys();

let publicEncrypt = encryptStringWithRsaPublicKey("hello", "public.pem")
let privateDecrypt = decryptStringWithRsaPrivateKey(publicEncrypt, "private.pem");
console.log({publicEncrypt, privateDecrypt})