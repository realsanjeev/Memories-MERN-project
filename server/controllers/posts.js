import PostMessage from "/workspaces/Mongodb-project/server/models/postMessage.js" 

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        console.log(postMessages);
        res.status(200).json(PostMessage);

    } catch(error) {
        res.status(404).json(error.message);
    }
}

export const createPost = async (req, res) => {
    const body = req.body;

    const newPost = new postMessage();
    try {
        await newPost.save();
        res.status(201).json(newPost);
        
    } catch (error) {
        res.status(409).json({message: error});
        
    }
}