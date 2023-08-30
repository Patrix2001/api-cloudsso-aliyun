require("dotenv").config();
const Core = require('@alicloud/pop-core').RPCClient;

const directoryId = "d-02n7gt70sv66";
const username = "test-juan";
const password = "@Juan1234";

const client = new Core({
  accessKeyId: process.env.ACCESS_ID,
  accessKeySecret: process.env.ACCESS_SECRET,
  endpoint: 'https://cloudsso.cn-hongkong.aliyuncs.com',
  apiVersion: '2021-05-15'
});

client.request('ListGroups', {
  "DirectoryId": directoryId,
}, {
  method: 'POST',
  formatParams: false
}).then((resultGroup) => {
  //Make Call API: action, param, options
  for (let index = 0; index < 2; index++) {
    client.request('CreateUser', {
      "DirectoryId": directoryId,
      "UserName": `${username}-${index}`
    }, {
      method: 'POST',
      formatParams: false,
    }).then((result) => {
      client.request('ResetUserPassword', {
        "DirectoryId": directoryId,
        "UserId": result['User']['UserId'],
        "Password": password
      }, {
        method: 'POST',
        formatParams: false,
      }).then((result) => {
        console.log(`${JSON.stringify(result)}: username ${username}-${index} set new password`);
      }, (ex) => {
        console.log("error ResetUserPassword::", ex);
      })


      client.request('AddUserToGroup', {
        "DirectoryId": directoryId,
        "UserId": result['User']['UserId'],
        "GroupId": resultGroup['Groups'][0]['GroupId']
      }, {
        method: 'POST',
        formatParams: false,
      }).then((result) => {
        console.log(`${JSON.stringify(result)}: username ${username}-${index} assign to AdminGroup`);
      }, (ex) => {
        console.log("error AddUserToGroup::", ex);
      })
    }, (ex) => {
      console.log(`error CreateUser ${index}::`, ex);
    })
  }
}, (ex) => {
  console.log("error ListGroups::", ex);
})

