const bcrypt = require('bcrypt');

async function generateHash() {
    const password = "admin123"; // ya jo bhi password rakhna hai
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log("Admin password hash:", hash);
}

generateHash(); 