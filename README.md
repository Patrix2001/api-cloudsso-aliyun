# Requirements

* Node js v20.5.1 [Installation Package](https://nodejs.org/en/blog/release/v20.5.1)
* NPM v9.8.0

# Instructions

* Clone or download zip this repo

* Install packages for Node.js

```
npm install
```

* Create file ``.env``

* Copy content of ``.env.example`` and paste it to ``.env``. Edit your **secret id** and **secret key**

* Check your **directory_id** with execute ```node config.js``` in terminal.

* Edit **username**, **password** in script ``index.js`` and **username** same as your modify in script ``destroy.js``. **directoryId** is from value of **DirectoryId** and **groupId** is from **GroupId** in terminal.
![image](https://github.com/Patrix2001/api-cloudsso-aliyun/assets/61679822/3cc5681d-7850-4032-b919-e37d862fc3ac)

* Run ``index.js`` script to create users

```
node index.js
```

* If want delete users, run ``destroy.js`` script

```
node destroy.js
```

## Expected output:

![image](https://github.com/Patrix2001/api-cloudsso-aliyun/assets/61679822/57c8d678-2609-4aff-a717-570ca3b3ab77)


# Limitation

* Destroy script can delete up to 100 accounts per execute script
