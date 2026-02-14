// Generate bcrypt hash for admin password
import bcrypt from 'bcryptjs';

const email = 'rabaailyass2004@gmail.com';
const password = 'Admin@123'; // Default password - MUST be changed after first login

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('\n==============================================');
console.log('BIJOUX IYL - Admin Credentials');
console.log('==============================================');
console.log('Email:', email);
console.log('Default Password:', password);
console.log('\nPassword Hash (for SQL):');
console.log(hash);
console.log('\n⚠️  IMPORTANT: Change this password immediately after first login!');
console.log('==============================================\n');

// Update the SQL script
const fs = await import('fs');
const sqlPath = './scripts/02-seed-data.sql';
const sqlContent = fs.readFileSync(sqlPath, 'utf-8');
const updatedSQL = sqlContent.replace(
  '$2a$10$YourHashedPasswordHere',
  hash
);
fs.writeFileSync(sqlPath, updatedSQL);

console.log('✅ Updated 02-seed-data.sql with actual password hash\n');
