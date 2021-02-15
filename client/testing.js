const axios = require('axios');

axios
    .get(
        'http://localhost:8081/api/messages',
        {
            headers: {
                Host: 'localhost:3000',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTI5NDQ5YjdjZmUyMjEyOGFiNDkzNiIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE1OTk0MTkzNzl9.VmaKU4baJH1RfhkVa8T1nxclQ5mmB3DHD3la2jRmR_U',
            },
        },
        {
            data: {
                text: 'hello world',
            },
        }
    )
    .then(data => {
        console.log(data);
    });
