const News = require("../models/newsModel");

const createNewsArticle = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
        }

        const newArticle = new News({
            title,
            content,
            author: author || "Anonymous",
        });

        await newArticle.save();
        return res.status(201).json({
            message: "News article created successfully",
            article: newArticle,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const readNewsArticle = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Article ID is required" });
        }

        const article = await News.findById(id);
        if (!article) {
            return res.status(404).json({ message: "News article not found" });
        }

        return res.status(200).json({ article });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const updateNewsArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        if (!title && !content) {
            return res.status(400).json({ message: "At least title or content must be provided" });
        }

        const updatedArticle = await News.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true } // To return the updated document
        );

        if (!updatedArticle) {
            return res.status(404).json({ message: "News article not found" });
        }

        return res.status(200).json({
            message: "News article updated successfully",
            article: updatedArticle,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const deleteNewsArticle = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Article ID is required" });
        }

        const deletedArticle = await News.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "News article not found" });
        }

        return res.status(200).json({
            message: "News article deleted successfully",
            article: deletedArticle,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createNewsArticle, 
    readNewsArticle, 
    updateNewsArticle, 
    deleteNewsArticle 
}