require("dotenv").config();
const Core = require('@alicloud/pop-core').RPCClient;

const directoryId = "d-02n7gt70sv66";
const username = "test-juan";
const groupId = "g-029xpm0u6v69j8urwt39";

const client = new Core({
    accessKeyId: process.env.ACCESS_ID,
    accessKeySecret: process.env.ACCESS_SECRET,
    endpoint: 'https://cloudsso.cn-hongkong.aliyuncs.com',
    apiVersion: '2021-05-15'
});

//Make Call API: action, param, options
client.request('ListUsers', {
    "DirectoryId": directoryId,
    "Filter": `UserName sw ${username}-`,
    "MaxResults": 100
}, {
    method: 'POST',
    formatParams: false,
}).then((result) => {
    for (let index = 0; index < result.Users.length; index++) {
        client.request('RemoveUserFromGroup', {
            "DirectoryId": directoryId,
            "UserId": result.Users[index]['UserId'],
            "GroupId": groupId
        }, {
            method: 'POST',
            formatParams: false,
        }).then((resultGroup) => {
            console.log(`${JSON.stringify(resultGroup)}: username ${username}-${index} removed from AdminGroup`);


            client.request('DeleteUser', {
                "DirectoryId": directoryId,
                "UserId": result.Users[index]['UserId'],
            }, {
                method: 'POST',
                formatParams: false,
            }).then((result) => {
                console.log(`${JSON.stringify(result)}: username ${username}-${index} deleted`);
            }, (ex) => {
                console.log(`error DeleteUser ${index}::`, ex);
            })
        }, (ex) => {
            console.log(`error RemoveUserFromGroup ${index}::`, ex);
        })
    }
}, (ex) => {
    console.log(ex);
})



