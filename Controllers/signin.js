const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Incorrect form submission');
}
   db.select('email', 'hash').from('login')
   .where('email', '=', email)
    .then(data =>{
        const validation = bcrypt.compareSync(password, data[0].hash);
        if (validation) {
            db.select('*').from('users')
            .where('email', '=', email)
            .then(user =>{
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Unable to Login!'))
        } else {
            res.status(400).json('Wrong Username / Password!')
        }
        
    }) 
    .catch(err => res.status(400).json('Wrong Username/password!'))
}

module.exports = {
    handleSignIn: handleSignIn
}