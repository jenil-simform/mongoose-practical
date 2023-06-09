const User = require('../models/users.model');
const Post = require('../models/posts.model');
const mongoose = require('mongoose')

//finding latest comments using aggregate pipeline with pagination, sorting and projection
const findLatestComments = async (req, res, next) => {
    try {
        const comments = await Post.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $unwind: '$comments'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.commentBy',
                    foreignField: '_id',
                    as: 'comments.commentBy'
                }
            },
            {
                $sort: { 'comments.commentDate': -1 }
            },
            {
                $skip: +req.query.skip
            },
            {
                $limit: +req.query.limit
            },
            {
                $project: {
                    _id: 0,
                    'comments.comment': 1,
                    'comments.commentBy.username': 1,
                    'comments.commentDate': 1
                }
            }
        ]);

        if (comments.length === 0) {
            return res.status(404).json({ error: 'There is no comments on post!' });
        }

        res.status(200).json({ data: comments })
    }
    catch (err) {
        next(err)
    }
}


const searchByUsername = async (req, res, next) => {
    try {
        const users = await User.find({ username: { $regex: req.query.search, $options: 'i' } }, { createdAt: 0, updatedAt: 0, __v: 0 });
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found!' })
        }
        res.status(200).json({ data: users })
    }
    catch (err) {
        next(err)
    }
}

//finding counts of post with specific tag 
const countOfPosts = async (req, res, next) => {
    try {
        const posts = await Post.aggregate([
            {
                $unwind : '$tags'
            },
            {
                $group : {_id : "$tags", count : {$sum : 1}}
            }
        ]);
        if (posts.length === 0) {
            return res.status(404).json({ error: 'No posts found!' })
        }
        res.status(200).json({ data: posts })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    findLatestComments,
    searchByUsername,
    countOfPosts
}