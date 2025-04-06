Run the Server in VS Code
1️⃣ Open VS Code Terminal (Ctrl + ~)
2️⃣ Start the server by running:
node server.js
================================================================================================
Check MySQL Service
Open Command Prompt (Windows) or Terminal (Mac/Linux)
Run the following command to check if MySQL is running:
mysql -u root -p

If prompted, enter your MySQL root password. If successful, you’ll see the MySQL command prompt:
mysql>
If MySQL is not running, start it using:

Windows:
net start MySQL

=================================================================================================
if MySQL authentication error then 
1.Open mysql Command Prompt (Windows) and paste 
2.paste-> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';->enter
FLUSH PRIVILEGES;
3.Replace 'your_password' with your actual MySQL password. If you don’t have a password, just use:
	ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'snehal_2108';
4.Restart MySQL 
EXIT;->enter
net stop mysql->enter
net start mysql->enter
==================================================================================================
new create
1.create folder HEALTH TRACKER
2.open vs code and open folder 
3.open terminal 
4.Set-ExecutionPolicy Unrestricted -Scope CurrentUser
5.npm cache clean --force
6.npm init -y
7.npm install express cors dotenv body-parser bcryptjs jsonwebtoken express-validator express-session nodemailer mysql2 bcrypt multer path

========================
for run code 		node server.js   
for stop the code 	ctrl + c       
   

