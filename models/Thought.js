const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (v) => v.toLocaleTimeString('en-US'),
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;