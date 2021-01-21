const PostModel = require('./post')

const createPost = async({title, description, userId, keywords, requirements, locations, categories, salary, active=true}) => {

    const post = await PostModel.create({title, description, owner:userId, keywords, requirements, locations, categories, salary, active})
 
    return post

}

const getPosts = async ({page,limit,keyword,maxSalary,minSalary,companyId,category,location}) => {

    const offset = (page-1)*limit

    const query = {}

    if(keyword){

        query.keywords = {$all: keyword}

    }

    if(minSalary && maxSalary){

        query.salary = {$gte:minSalary, $lte:maxSalary}

    }

    if(companyId){

        query.owner = companyId

    }

    if(category){

        query.categories = {$all: category}

    }

    if(location){

        query.locations = {$all: location}

    }

    const posts = await PostModel.find(query).skip(offset).limit(limit).sort({createdAt:-1}).populate({path:'owner',select:'name email logo'})

    const total = await PostModel.find(query).countDocuments()

    return {posts, total}

}

const getAPost = async(postId) => {

    const post = await PostModel.findById(postId).populate({path:'owner',select:'name logo'})

    if(!post) throw new Error('Post is not found')

    return post 
 
}

const getDetailPost = async(postId,userId) => {

    const post = await PostModel.findOne({_id:postId, owner:userId}).populate({path:'applications', populate:{
        path:'resume',  
        select:'link'
    }})
    
    if(!post) throw new Error('Post is not found')

    post.applications = post.applications.map(application => {

        const doc = application._doc

        const {job,owner,updatedAt,...returnData} = doc

        return returnData
    })

    return post 

}

const updatePost = async(postId, userId, updates) => {

    const fields = Object.keys(updates)

    if(!isValidUpdate(fields, ['active', 'salary', 'description','requriements', 'keywords','createdAt'])){
 
        throw new Error('Update is invalid')
    
    } 

    const post = await PostModel.findOne({_id:postId, owner:userId})

    if(!post) throw new Error('Post is not found')

    fields.forEach(field => post[field] = updates[field])

    await post.save()

    return post 

}

const deletePost = async(postId, userId) => {

    const post = await PostModel.findOneAndDelete({_id:postId,owner:userId})

    if(!post) throw new Error('Cannot delete post')

    return post 

}

const isValidUpdate = (updates, allowedUpdate) => {

    return updates.every(update => allowedUpdate.includes(update))

}
 

module.exports = {createPost, getAPost, getPosts, getDetailPost,updatePost, deletePost}