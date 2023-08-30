require("dotenv").config();
const Core = require('@alicloud/pop-core').RPCClient;

const client = new Core({
    accessKeyId: process.env.ACCESS_ID,
    accessKeySecret: process.env.ACCESS_SECRET,
    endpoint: 'https://cloudsso.cn-hongkong.aliyuncs.com',
    apiVersion: '2021-05-15'
});

client.request('ListDirectories', {}, {
    method: 'POST',
    formatParams: false,
}).then((result) => {
    console.log("Directory ID: ", result['Directories'][0]['DirectoryId']);

    client.request('ListGroups', { "DirectoryId": result['Directories'][0]['DirectoryId'] }, {
        method: 'POST',
        formatParams: false,
    }).then((resultGroup) => {
        console.log("List Group ID: ");
        for (let index = 0; index < resultGroup['Groups'].length; index++) {
            console.log(resultGroup['Groups'][index]['GroupId']);
        }
    }, (ex) => {
        console.log("error ListDirectories::", ex);
    })

}, (ex) => {
    console.log("error ListDirectories::", ex);
})