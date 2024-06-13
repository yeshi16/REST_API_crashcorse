const e = require('express');
const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
})

// middleware for parsing json
app.use(express.json())

// data
let userList = [
    {
        id: 1,
        name: "john",
        age: 20
    },
    {
        id: 2,
        name: "jane",
        age: 22
    },
    {
        id: 3,
        name: "mike",
        age: 40
    },
    {
        id: 4,
        name: "jane",
        age: 22
    }
]
app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/users/', (req, res) => {
    res.json(userList)

})

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10)
    const user = userList.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send({ error: 'User not found' });
    }
});

app.post('/users', (req, res) => {
    // grab data sent by cliient
    // const newUser = req.body
    if(req.body.name && req.body.age){
    const newUser = {
        id: userList.length + 1,
        name: req.body.name,
        age: req.body.age
    }
    // add data to userList
    userList.push(newUser)
    // return new list
    res.json(userList)
} else {
res.json({ error: "Insufficient Data" });
}
})

// put method update all the object
app.put('/users/:id', (req, res) => {
    //grab the new name
    const userId = parseInt(req.params.id, 10)
    const name = req.body.name
    const age = req.body.age
    // loop through list and update name or age
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === userId) {
            userList[i].name = name
            userList[i].age = age
        }
    }
    // return new userlist
    res.json(userList)
})
// put method update all the object
app.patch('/users/:id', (req, res) => {
    //grab the new name
    const userId = parseInt(req.params.id, 10)
    const name = req.body.name
    const age = req.body.age

    let userUpdated = false;

    // loop through list and update name or age
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === userId) {
            if (name !== undefined) {
                userList[i].name = name;
            }
            if (age !== undefined) {
                userList[i].age = age;
            }
            userUpdated = true;
            break;
        }
    }
    // return new userlist
    if (userUpdated) {
        res.json(userList);
    } else {
        res.status(404).send('User not found');
    }
})

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10)
    let userFound = false
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === userId) {
            // i = position to remove item
            // 1 = Number of items to be removed
            userList.splice(i, 1)
            userFound = true
            break
        }
    }

    if(userFound){
        res.json(userList)
    } else {
        res.status(404).send('user not found')
    }
})