// usage: SPA_PW=... node encrypt.js data.json out.enc.json
const fs=require('fs');const {webcrypto:c}=require('crypto');
(async()=>{const pw=process.env.SPA_PW;if(!pw)throw'no pw';
const salt=c.getRandomValues(new Uint8Array(16)),iv=c.getRandomValues(new Uint8Array(12)),iter=250000;
const base=await c.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
const key=await c.subtle.deriveKey({name:'PBKDF2',salt,iterations:iter,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['encrypt']);
const ct=await c.subtle.encrypt({name:'AES-GCM',iv},key,fs.readFileSync(process.argv[2]));
const b=x=>Buffer.from(x).toString('base64');
fs.writeFileSync(process.argv[3],JSON.stringify({v:1,iter,salt:b(salt),iv:b(iv),ct:b(ct)}));console.log('encrypted',fs.statSync(process.argv[3]).size)})();
