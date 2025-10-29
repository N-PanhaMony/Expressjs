const express = require ('express')
const router = express.Router();

let posts = [
    {id : 1 , name : 'Mr A'},
    {id : 2 , name : 'Mrs B'},
    {id : 3 , name : 'Miss C'},
]

//get all posts
router.get('/', (req, res) =>{
    const limit = parseInt(req.query.limit)

    if (!isNaN(limit) && limit>0){
        return res.status(200).json(posts.slice(0,limit))
    }
    res.status(200).json(posts)
})
// create new post
router.post('/', (req,res ) =>{
    const newPost ={
        id : posts.length + 1,
        name : req.body.name
    }
    if(!newPost.name){
        return res.status(400)
    }
    posts.push(newPost)
    res.status(201).json(posts)
})

module.exports = router