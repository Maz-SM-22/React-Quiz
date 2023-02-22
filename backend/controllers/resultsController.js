const Result = require('../models/Result');
const { BadRequest } = require('../utils/error');

exports.addResult = async (req, res, next) => {
    try {
        const { score, answers } = req.body;
        if (!score && !answers) {
            throw new BadRequest('Request missing data');
        } else {
            const user = req.user;
            console.log(user);
            const result = await Result.create({
                score: score,
                answers: answers
            })
            res.status(200).send({ message: 'All good up to here' })
            // result.save((err) => {
            //     if (err) next(err);
            //     else {
            //         user.results.push(result._id);
            //         user.save((err) => {
            //             if (err) return next(err);
            //             res.status(200).send({
            //                 status: 'success',
            //                 message: 'Result saved successfully'
            //             })
            //         })
            //     }
            // })
        }
    } catch (error) {
        next(error)
    }
}