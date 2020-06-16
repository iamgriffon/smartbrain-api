const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'c4df1e7e7e83499594114f873b920f5e'
  });

const handleApiCall = (req, res) => {
      app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Error'))}

const imageHandler =  (req, res, db) =>{
    const { id } = req.body;
    db('users').where('id', '=', id) //Atualize a db (users) onde o id da pessoal é o mesmo id do estado (confirmação lógica)
    .increment('entries', 1) //Incremente por o valor de entries por 1
    .returning('entries')
    .then(entries =>{
        console.log(entries);
        res.json(entries);
    })
    .catch(err => res.status(400).json('Error counting entries!'))}

    module.exports = {
        imageHandler: imageHandler,
        handleApiCall: handleApiCall
    }