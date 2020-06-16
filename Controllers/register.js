const handleRegister = (req, res, db, bcrypt) => { //Para registrar
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission')
    }

    const hash = bcrypt.hashSync(password);
    db.transaction(trx => { //Uma transação de db
        trx.insert({ //Ela vai inserir os campos hash e login (pegos no corpo da request)
            hash: hash,
            email: email
        })
        .into('login') //Na tabela login
        .returning('email') //vai retornar o email 
        .then(async loginemail =>{ //E dai pegar esse email que retornou (como parametro do then)
            const user = await trx('users') //vai na tabela users
                .returning('*') //vai abrir todos os campos
                .insert({
                    email: loginemail[0],
                    name: name,
                    joined: new Date() //E a data que é tirada no próprio JS
                });
            res.json(user[0]); //Vai retornar o user em JSON no response da request;    
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        
    .catch(err => res.status(400).json('Failed to Register!'));
}

module.exports = {
    handleRegister: handleRegister
}