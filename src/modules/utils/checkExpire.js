const PostModel = require('../job-post/post')

const updatePosts = async () => {
    console.log("database updated")
    try {
        const posts = await PostModel.updateMany({
            $expr: {

                $lt: [

                    "$createdAt",

                    { $subtract: [new Date(), 2629800000] }

                ]

            }
        }, {

            $set: { active: false }

        })

        return posts

    } catch (error) {
        console.log(error.message)
    }
}

updatePosts()
setInterval(() => updatePosts(), 86400000)