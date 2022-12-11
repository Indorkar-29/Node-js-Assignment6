const mongoose = require('mongoose');
mongoose.pluralize(null);
const blogSchema = new mongoose.Schema({
    // Your code goes here
    topic:{type:String,required:true},
    description:{type:String,required:true},
    posted_at:{ type: Date,require:true },
    posted_by:{type:String,required:true},
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;