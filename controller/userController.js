const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');


module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
                .select('-__v');

            if (!user) {
                return res.status(404).json({message: 'No user with that ID'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if (!user) {
                return res.status(404).json({message: 'No user with this id!'});
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            console.log("DELETING USER:" + req.params.userId);
            const foundUser = await User.findOneAndDelete({_id: req.params.userId});
            console.log(foundUser);
            if (!foundUser) {
                return res.status(404).json({message: 'No user with this id!'});
            }
            res.json({message: 'User was successfully deleted!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {

        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.body}},
                {runValidators: true, new: true}
            );

            if (!user) {
                return res
                    .status(404)
                    .json({message: 'No thought found with that ID'});
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            console.log("REMOVING FRIEND:" + req.params.friendId);
            const foundFriend = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: {_id: req.params.friendId}}},
                {runValidators: true, new: true}
            );

            if (!foundFriend) {
                return res
                    .status(404)
                    .json({message: 'No friend found with that ID'});
            }

            res.json(foundFriend);
        } catch (err) {
            console.log(err);
            console.log(err);
            res.status(500).json(err);
        }
    },

}