const {ObjectId} = require('mongoose').Types;
const {Thought} = require('../models');


module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
                .select('-__v');

            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const user = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if (!user) {
                return res.status(404).json({message: 'No Thought with this id!'});
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            console.log("DELETING THOUGHT:" + req.params.thoughtId);
            const foundThought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            console.log(foundThought);
            if (!foundThought) {
                return res.status(404).json({message: 'No Thought with this id!'});
            }
            res.json({message: 'Thought was successfully deleted!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {

        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reaction: req.body}},
                {runValidators: true, new: true}
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({message: 'No thought found with that ID :('});
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reaction: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({message: 'No thought found with that ID :('});
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}