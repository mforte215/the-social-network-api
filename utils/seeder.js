const userData = require('./userSeed');
const thoughtData = require('./thoughtSeed');
const connection = require('../config/connection');
const {User, Thought} = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({name: 'users'}).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    let thoughtCheck = await connection.db.listCollections({name: 'thoughts'}).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }



    //Add my user data to the collection
    let createdUsers = await User.collection.insertMany(userData);
    console.log(createdUsers);

    let createdThoughts = await Thought.collection.insertMany(thoughtData);

    console.log(createdThoughts);

});



