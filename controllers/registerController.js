const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    //const { user, pwd } = req.body;
    /*
    const { user,  pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'All fields are required.' });
    */

    const { user,  pwd, firstN} = req.body;
    if (!user || !pwd || !firstN) return res.status(400).json({ 'message': 'All fields are required.' });

    /*
    const { user,  pwd, firstName, lastName, uni_id, stamClass, cpr, address, postal, city, mail, mobile} = req.body;
    if (!user || !pwd || !firstName || !lastName || !uni_id || !stamClass || !cpr || !address || !postal || !city || !mail || !mobile) return res.status(400).json({ 'message': 'All fields are required.' });    
    */
    
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user}).exec(); // Using exec because of "findOne"
    //const duplicate2 = await User.findOne({ uniId: uni_id}).exec();
    
    //const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); //Conflict 
    
    try {
        // encrypt the password with bcrypt
        // bcrypt default salt is 10 salts 1 salt is double.
        // default hash is like 2^10
        const hashedPwd = await bcrypt.hash(pwd, 10);
        console.log(firstN);
        // create & store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd,
            "firstname": firstN
        });

        /*
        const result = await User.create({
            "username": user,
            "password": hashedPwd,
            "fornavn": firstName,
            "efternavn": lastName,
            "uniId": uni_id,
            "stamklasse": stamClass,
            "cprNr": cpr,
            "adresse": address,
            "zip": postal,
            "by": city,
            "email": mail,
            "tlfNr": mobile
        });
        */


        console.log(result);
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        console.log("We're in error area");
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };