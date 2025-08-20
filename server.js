// hash.js
const bcrypt = require("bcrypt");

const password = "1234";

async function generarHash() {
  const hash = await bcrypt.hash(password, 10); // 10 rounds de sal
  console.log("Contraseña:", password);
  console.log("Hash generado:", hash);
}

generarHash();
