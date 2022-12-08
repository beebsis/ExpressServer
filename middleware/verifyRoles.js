const verifyRoles = (...allowedRoles) => {
    return(req, res, next) => {
        // If we have requst, it needs to have roles
        // or it should not be valid
        if (!req?.roles) return res.sendStatus(401); //Un Auth
        const rolesArray = [...allowedRoles];
        
        /*// posts the role ids to the console
        console.log(rolesArray);
        console.log(req.roles);
        */
        //If valid returns false "includes" is a booleon.
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;