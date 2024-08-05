const express = require ("express");
const app = express();
const fs = require("fs");
const path = require('path');
const pool = require ("./db");
const bodyParser = require("body-parser");

//load middleware
app.use(express.static(path.join(__dirname, "../trindex")));
// Also serve files from the 'media' directory
app.use('/media', express.static(path.join(__dirname, "../trindex/media")));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Serve the html file
app.get("/", (req, res)=>{
    const resBody = path.join(__dirname, "../trindex/pages/index.html");
    res.status(200).sendFile(resBody);
});

app.get("/restaurants.html", (req, res)=>{
    const resBody = path.join(__dirname, "../trindex/pages/restaurants.html");
    res.status(200).sendFile(resBody);
});

app.get("/cinemas.html", (req, res)=>{
    const resBody = path.join(__dirname, "../trindex/pages/cinemas.html");
    res.status(200).sendFile(resBody);
});

app.get("/cafes.html", (req, res)=>{
    const resBody = path.join(__dirname, "../trindex/pages/cafes.html");
    res.status(200).sendFile(resBody);
});

app.get("/malls.html", (req, res)=>{
    const resBody = path.join(__dirname, "../trindex/pages/malls.html");
    res.status(200).sendFile(resBody);
});

app.get("/gyms.html", (req, res)=>{
    const resBody = path.join(__dirname, "../trindex/pages/gyms.html");
    res.status(200).sendFile(resBody);
});

app.get("/tpark.html", (req, res)=>{
    const resBody = path.join(__dirname, "../trindex/pages/tpark.html");
    res.status(200).sendFile(resBody);
});

app.get("/about.html", (req, res)=>{
    const resBody = path.join(__dirname, "../trindex/pages/about.html");
    res.status(200).sendFile(resBody);
});

app.get("/contact.html", (req, res)=>{
    const resBody = path.join(__dirname, "../trindex/pages/contact.html");
    res.status(200).sendFile(resBody);
});

// Dynamic item details route
app.get("/restaurants/:name", async (req, res) => {
    const template = fs.readFileSync("../trindex/pages/item-details.html", "utf-8");
    try {
        const result = await pool.query("SELECT id, url FROM name_url WHERE name = $1", [req.params.name]);
        if (result.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        const item = result.rows[0];
        const resBody = template
            .replace(/#{name}/g, req.params.name)
            .replace(/#{image}/g, `/media/${req.params.name}.jpg`);
        res.status(200).send(resBody);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/cinemas/:name", async (req, res) => {
    const template = fs.readFileSync("../trindex/pages/item-details.html", "utf-8");
    try {
        const result = await pool.query("SELECT id, url FROM name_url WHERE name = $1", [req.params.name]);
        if (result.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        const item = result.rows[0];
        const resBody = template
            .replace(/#{name}/g, req.params.name)
            .replace(/#{image}/g, `/media/${req.params.name}.jpg`);
        res.status(200).send(resBody);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/cafes/:name", async (req, res) => {
    const template = fs.readFileSync("../trindex/pages/item-details.html", "utf-8");
    try {
        const result = await pool.query("SELECT id, url FROM name_url WHERE name = $1", [req.params.name]);
        if (result.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        const item = result.rows[0];
        const resBody = template
            .replace(/#{name}/g, req.params.name)
            .replace(/#{image}/g, `/media/${req.params.name}.jpg`);
        res.status(200).send(resBody);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/malls/:name", async (req, res) => {
    const template = fs.readFileSync("../trindex/pages/item-details.html", "utf-8");
    try {
        const result = await pool.query("SELECT id, url FROM name_url WHERE name = $1", [req.params.name]);
        if (result.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        const item = result.rows[0];
        const resBody = template
            .replace(/#{name}/g, req.params.name)
            .replace(/#{image}/g, `/media/${req.params.name}.jpg`);
        res.status(200).send(resBody);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/gyms/:name", async (req, res) => {
    const template = fs.readFileSync("../trindex/pages/item-details.html", "utf-8");
    try {
        const result = await pool.query("SELECT id, url FROM name_url WHERE name = $1", [req.params.name]);
        if (result.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        const item = result.rows[0];
        const resBody = template
            .replace(/#{name}/g, req.params.name)
            .replace(/#{image}/g, `/media/${req.params.name}.jpg`);
        res.status(200).send(resBody);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/theme-parks/:name", async (req, res) => {
    const template = fs.readFileSync("../trindex/pages/item-details.html", "utf-8");
    try {
        const result = await pool.query("SELECT id, url FROM name_url WHERE name = $1", [req.params.name]);
        if (result.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        const item = result.rows[0];
        const resBody = template
            .replace(/#{name}/g, req.params.name)
            .replace(/#{image}/g, `/media/${req.params.name}.jpg`);
        res.status(200).send(resBody);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


//Querry database to obtain url for item
app.get("/name_url/:name", async (req, res)=>{

    try{
        const result = await pool.query("SELECT id, url FROM name_url WHERE name = $1", [req.params.name]);
        const resBody = result.rows[0].url;
        res.status(200).send(resBody);
    }
    catch(error){
        console.error(err);
        res.status(500).send("Server Error");
    }

});

 // Fetch popularity score for a specific item
 app.get("/popularity/:name", async (req, res) => {
     try {
         const popularityResult = await pool.query("SELECT score FROM popularity WHERE name = $1", [req.params.name]);
         const popularity = popularityResult.rows[0].score;
         res.status(200).json(popularity);
    } catch (err) {
         console.error(err);
         res.status(500).send("Server Error");
     }
 });

 // Update popularity score
 app.post("/update-popularity", async (req, res) => {
    const {name, increment} = req.body;
    try {
        let value =0;
        const result = await pool.query("SELECT id FROM popularity WHERE name = $1", [name]);
        if (result.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        const id = result.rows[0].id;
        if(increment===true){
            value=1;
        }
        else value =-1;
        await pool.query("UPDATE popularity SET score = score + $2 WHERE id = $1",
            [id, value]
        );
        res.send("Popularity updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
 });

//query server to fetch comments
app.get("/comments/:name", async(req, res)=>{
    try{
        const result = await pool.query(`SELECT id, commentsarr, created_at FROM comments WHERE name = $1`, [req.params.name])

        const resBody = [result.rows[0].commentsarr, result.rows[0].created_at];
        res.send(resBody);
    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }

});

// // Add a new comment
app.post("/add-comment", async (req, res) => {
    const { name, comment, created_at } = req.body;
    try {
        const result = await pool.query("SELECT id FROM comments WHERE name = $1", [name]);
        if (result.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        const itemId = result.rows[0].id;
        const newComment = await pool.query("UPDATE comments SET commentsarr = array_append(commentsArr, $2) WHERE id = $1", [itemId, comment]);
        const newDate = await pool.query("UPDATE comments SET created_at = array_append(created_at, $2) WHERE id = $1", [itemId, created_at]);
        res.send("Comment added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.post("/submit-form", async(req, res)=>{
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email_address = req.body.email_address;
    const comments = req.body.comments;
    let signup = false;
    let terms = false;

    if (req.body.signup){
         signup = true;
    }
    if (req.body.terms){
        terms = true;
   }
   try{
        await pool.query("INSERT INTO form (first_name, last_name, email_address, comments, signup, terms) VALUES ($1, $2, $3, $4, $5, $6)RETURNING *",
        [first_name, last_name, email_address, comments, signup, terms]);
        res.send("Thank you for your feedback.");
   }catch(error){
        console.error('Error submitting form:', error);
        res.status(500).send('Error submitting form');
   }
});


const port = process.env.PORT||5000;
app.listen(port, ()=> console.log(`Server is listening on port ${port}...`));
