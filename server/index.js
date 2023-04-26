import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from '/workspaces/Mongodb-project/server/routes/posts.js'

const app = express();

app.use(router)
app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://makerking:makerking@cluster0.xpammz2.mongodb.net/test";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
    })
    .then(() => app.listen(PORT, () => {console.log(`Connecting to Port ${PORT}`)}))
    .catch((error) => console.log(error.message));
