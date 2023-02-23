const User = require('../models/User');
const Result = require('../models/Result');
const { BadRequest, NotFoundError } = require('../utils/error');

exports.addResult = async (req, res, next) => {
    try {
        const { userId, category, numQuestions, score, answers, } = req.body;
        if (!numQuestions || !score || !answers) {
            throw new BadRequest('Request missing data');
        } else {
            const user = await User.findById(userId);
            if (!user) {
                throw new NotFoundError('Unable to save result. User not found');
            }
            const result = await Result.create({
                category: category,
                numQuestions: numQuestions,
                score: score,
                answers: answers
            })
            result.save((err) => {
                if (err) next(err);
                else {
                    user.results.push(result._id);
                    user.save((err) => {
                        if (err) return next(err);
                        res.status(200).send({
                            status: 'success',
                            message: 'Result saved successfully'
                        })
                    })
                }
            })
        }
    } catch (error) {
        next(error)
    }
}