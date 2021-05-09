const express = require('express');
const app = express();
const posts = require('./posts.json');
const fs = require('fs');

app.use(express.json());

// Fetching posts
app.get('/posts', (req, res) => {
    return res.json({ posts });
})

// Create a new post
app.post('/posts', (req, res) => {
    console.log(req.body.newPost);

    // save a new post to the database
    posts.push(req.body.newPost);
    
    // save the updated data to posts.json
    // stringify the json data
    let stringedData = JSON.stringify(posts);
    fs.writeFile('posts.json', stringedData, function(err) {
        if (err) {
            return res.status(500).json({ message: err });
        }
    })
    // rewrite the file posts.json

    // send back a response to client
    return res.status(200).json({ message: "a new post has been created!" });
})

// Fetch a single post
app.get('/posts/:id', (req, res) => {
    // fetch req.params.id
    let id = req.params.id;
    // find a user with id 
    let foundPost = posts.find(post => {
        return String(post.id) === id;
    });
    console.log(foundPost);

    // return user object as response
    // return a 404 error if user is not found
    if (foundPost) {
        return res.status(200).json({ post: foundPost })
    } else {
        return res.status(404).json({ message: "user not found" });
    }

})

// Update a single post
app.put('/posts/:id', (req, res) => {
    // fetch req.params.id
    let id = req.params.id;
    // find a user with id 
    let foundPost = posts.find(post => {
        return String(post.id) === id;
    });

    // save the updated post to the database
    posts.splice(req.body.foundPost, 1, req.body.updatePost);
    

    // save the updated data to posts.json
    // stringify the json data
    let stringedData = JSON.stringify(posts);
    fs.writeFile('posts.json', stringedData, function(err) {
        if (err) {
            return res.status(500).json({ message: err });
        }
    })


    // send back a response to client
    return res.status(200).json({ message: "your post has been updated!" });

})


// Starting server
app.listen(3000, function() {
    console.log('server has started!');
})