const express = require("express")
const app = express()


let permission={};
app.get("/books", logger, (req, res) => {
    return res.send({ route: "/books" })
})

app.get("/libraries", logger, checkPermission("librarian"), (req, res) => {
   return res.send( { route: "/libraries", permission:permission.permission})
})

app.get("/authors",checkPermission("author"), logger,  (req, res) => {
    return res.send({ route: "/authors", permission:permission.permission})
})


function logger(req, res, next) {


    next()
}

function checkPermission(permis) {
    return function (req, res, next) {
        if (permis == "librarian") {
            permission.permission=true
          return  next();
        } else if (permis == "author") {
            permission.permission= true 
          return  next()
        }else{
            permission.permission= false
            next()
        }

    }

}



app.listen(4000, (req, res) => {
    console.log("port 4000 Listeneing")
})