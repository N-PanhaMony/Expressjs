const express = require ('express')
const router = express.Router();

let posts = [
    {id : 1 , name : 'Mr A'},
    {id : 2 , name : 'Mrs B'},
    {id : 3 , name : 'Miss C'},
]

//get all posts
router.get('/', (req, res) =>{
    // const limit = parseInt(req.query.limit)

    // if (!isNaN(limit) && limit>0){
    //     return res.status(200).json(posts.slice(0,limit))
    // }
    res.status(200).json(posts)
})

module.exports = router