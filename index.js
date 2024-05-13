const express = require('express')
const axios = require("axios")
const fs = require('fs')
const sharp = require('sharp')
const { log } = require('console')
require("dotenv").config()

const app = express()
const PORT = 4800;

app.use(express.json())

const API_Key_val = process.env.API_KEY
// console.log(apiKey);


app.get("/api/image/random/:category", async (req, res) => {
    try {
        const { category } = req.params
        console.log(category);
        const response = await axios.get("https://api.api-ninjas.com/v1/randomimage?category=" + category,
            {
                headers: {
                    'X-Api-Key': API_Key_val,
                    'Accept': 'image/jpg'

                },
                'responseType': 'arrayBuffer'

            })

        const resizedImageBuffer = await sharp(response.data)
            .resize({ width: 350, height: 300 }) // Set the image width and height
            .toBuffer();
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(resizedImageBuffer);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

app.listen(PORT, () => {
    console.log("Server is started at port " + PORT)
})