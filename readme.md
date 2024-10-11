## Setting the server 

1. **Need to run this command to create package.json**
```bash
npm init -y
```
2. **Need to install the basic Dependency**
```bash
npm i express mongoose cors cookie-parser dotenv jsonwebtoken bcrypt
npm i -D nodemon
```
3. **If you want to need to use the import syntax need to change into package.json**
```bash
  "type": "module",
```
4. ** Also need to change the starting command**
```bash
    "dev" : "nodemon index.js"
```