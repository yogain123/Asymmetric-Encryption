module.exports = (function(){

let p = "yoyo";
let encoded = (Buffer.from(p,"utf8").toString('base64'));
console.log({encoded});
let decoded = (Buffer.from(encoded,"base64").toString('utf8'));
console.log({decoded});
})();