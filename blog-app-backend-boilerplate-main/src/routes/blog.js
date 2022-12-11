const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here

// CREATE
router.post("/blog",async(req,res)=>{
    try{
        const bloggers=await Blog.create(req.body);
        res.status(200).json({
            status:"success",
            result: bloggers
        });
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        });
    }
});

// UPDATE
router.put("/blog/:id",async(req,res)=>{
    try{
        const bloggers=await Blog.updateOne({_id: req.params.id},req.body);
        const user=await Blog.find({_id:req.params.id});
        res.status(200).json({
            status:"success",
            result:user
        });
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        });
    }
});

// READ
router.get("/blog",async(req,res)=>{
    try{
        let bloggers;
        const { page, search } = req.query;
        if (search) {
            if(parseInt(page)>5){
                bloggers = await Blog.find({ topic: search }).limit(5);
            }else{
                bloggers = await Blog.find({ topic: search }).limit(parseInt(page));
            }
        } else {
          bloggers = await Blog.find();
        }
        if (bloggers.length) {
          res.status(200).json({
            status: "success",
            result: bloggers,
          });
        } else {
          res.status(200).json({
            status: "failed",
            result: "search not found",
          });
        }
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        });
    }
});

// DELETE
router.delete("/blog/:id",async(req,res)=>{
    try{
        const user=await Blog.find({_id:req.params.id});
        const bloggers=await Blog.deleteOne({_id:req.params.id});
        res.status(200).json({
            status:"success",
            result:user
        });
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        });
    }
});

router.get('/blog',(req,res)=>{
    res.json({ok:'blog'})
});
// router.get("*",(req,res)=>{
//     res.status(404).send("API NOT FOUND");
// });

module.exports = router;