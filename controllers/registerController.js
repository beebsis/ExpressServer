const User = require('../model/User');

/*
// Used for data in dir - not mongoDB
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
*/
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec(); // Using exec because of "findOne"
    //const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); //Conflict 
    
    try {
        // encrypt the password with bcrypt
        // bcrypt default salt is 10 salts 1 salt is double.
        // default hash is like 2^10
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // create & store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd 
        });
        console.log(result);
        /*
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        */
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };