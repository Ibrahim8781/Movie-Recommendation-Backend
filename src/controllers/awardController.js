const Award = require("../models/awardModel");

const createAward = async (req, res) => {
    try {
        const { referenceId, awardName, category, year, won } = req.body;
        
        if (!referenceId || !awardName) {
            return res.status(400).json({ message: 'ReferenceId, and awardName are required.' });
        }

        const newAward = new Award({
            referenceId,
            awardName,
            category,
            year,
            won,
        });

        const savedAward = await newAward.save();
        return res.status(201).json({ message: 'Award created successfully.', award: savedAward });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const readAward = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Award ID is required.' });
        }

        const award = await Award.findById(id);
        
        if (!award) {
            return res.status(404).json({ message: 'Award not found.' });
        }

        return res.status(200).json({ award });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const updateAward = async (req, res) => {
    try {
        const { id } = req.params;
        const { awardName, category, year, won } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Award ID is required.' });
        }

        const award = await Award.findById(id);
        
        if (!award) {
            return res.status(404).json({ message: 'Award not found.' });
        }

        award.awardName = awardName || award.awardName;
        award.category = category || award.category;
        award.year = year || award.year;
        award.won = won !== undefined ? won : award.won; // won is a boolean

        const updatedAward = await award.save();

        return res.status(200).json({ message: 'Award updated successfully.', award: updatedAward });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const deleteAward = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Award ID is required.' });
        }

        const award = await Award.findById(id);
        
        if (!award) {
            return res.status(404).json({ message: 'Award not found.' });
        }

        await Award.deleteOne({ _id: id });

        return res.status(200).json({ message: 'Award deleted successfully.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createAward, 
    readAward, 
    updateAward, 
    deleteAward, 
}