const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    //const { user, pwd } = req.body;
    /*
    const { user,  pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'All fields are required.' });
    */

    const { user,  pwd, firstN, lastN, uni_id, stamClass, cpr, address, city, postal} = req.body;
    if (!user || !pwd || !firstN || !lastN || !uni_id || !stamClass || !cpr || !address || !city || !postal) return res.status(400).json({ 'message': 'All fields are required.' });

    /*
    const { user,  pwd, firstName, lastName, uni_id, stamClass, cpr, address, postal, city, mail, mobile} = req.body;
    if (!user || !pwd || !firstName || !lastName || !uni_id || !stamClass || !cpr || !address || !postal || !city || !mail || !mobile) return res.status(400).json({ 'message': 'All fields are required.' });    
    */
    
    // check for duplicate usernames in the db
    const username_duplicate = await User.findOne({ username: user}).exec(); // Using exec because of "findOne"
    const uniId_duplicate = await User.findOne({uniId: uni_id}).exec();
    const cpr_duplicate = await User.findOne({cprNr: cpr}).exec();

    //const duplicate = usersDB.users.find(person => person.username === user);
    if (username_duplicate || uniId_duplicate || cpr_duplicate) return res.sendStatus(409); //Conflict 
    
    try {

        // encrypt the password with bcrypt
        // bcrypt default salt is 10 salts 1 salt is double.
        // default hash is like 2^10
        const hashedPwd = await bcrypt.hash(pwd, 10);
        console.log(firstN);
        // create & store the new user
        const result = await User.create({
            "username": user,
            "fornavn": firstN,
            "efternavn": lastN,
            "uniId": uni_id,
            "stamklasse": stamClass,
            "cprNr": cpr,
            "password": hashedPwd,
            "adresse": address,
            "zip": postal,
            "by": city
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