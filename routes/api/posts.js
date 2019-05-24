const express = require("express");
const router = express.Router();

//validator post input
const validatePostInput = require("../../validatation/post");

//Post model
const Post = require("../../models/Post");
//User model
const User = require("../../models/User");

//@router POST api/post
//desc    Create Posts
//Access  Public
router.post("/add", (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.body.id
  });

  newPost
    .save()
    .then(post => res.status(200).json(post))
    .catch(err =>
      res.status(404).json({
        post: "Oops something went wrong while creating the post"
      })
    );
});

//@router GET api/post
//desc    fetch all posts
//Access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res.status(404).json({
        post: "No post found"
      })
    );
});

//@router GET api/posts/:id
//desc    fetch posts by id
//Access  Public
// router.get("/:id", (req, res) => {
//   Post.findById(req.params.id)
//     .then(post => res.status(200).json(post))
//     .catch(err => res.status(404).json)({
//     post: "No post found with that ID"
//   });
// });

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Public

router.post("/like/:id", (req, res) => {
  console.log("adding like", req.body);

  User.findOne({
    _id: req.body.usrId
  })
    .then(usr => {
      Post.findOne({
        _id: String(req.params.id)
      }).then(post => {
        const UserLikes = post.like.filter(usrlike => {
          return String(usrlike.user).trim() === String(usr._id).trim();
        });
        console.log(UserLikes);
        console.log(
          post.like.filter(usrlike => {
            return String(usrlike.user).trim() === String(usr._id).trim();
            // console.log(
            //   String(usrlike.user).trim(),
            //   "",
            //   String(usr._id).trim()
            // );
          })
        );
        if (UserLikes.length > 0) {
          return res.status(200).json({
            like: "user already liked"
          });
        }
        post.like.unshift({
          user: usr._id
        });
        post.save().then(post => res.status(200).json(post));
      });
    })
    .catch(err =>
      res.status(400).json({
        post: "there is a problem in posting a like"
      })
    );
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Public
router.post("/unlike/:id", (req, res) => {
  console.log("adding dislike", req.body);
  User.findOne({
    _id: String(req.body.usrId).trim()
  }).then(usr => {
    Post.findById(req.params.id)
      .then(post => {
        const likeUsr = post.like.filter(like => {
          return String(like.user).trim() === String(usr._id).trim();
        });

        if (likeUsr.length < 1) {
          return res.status(400).json({
            notliked: "You have not yet liked this post"
          });
        }
        post.like.map((li, i) => {
          if (String(li.user).trim() === String(usr._id).trim()) {
            console.log("matched");
            post.like.splice(i, 1);
            post.save().then(post => res.json(post));
          }
        });

        // remove the index for the post like
        // const removeIndex = post.likes
        //   .map(item => {
        //     console.log("mapping");
        //     item.user.toString();
        //   })
        //   .indexOf(req.body.usrId);

        // Splice ou  t of array
        // post.likes.splice(removeIndex, 1);
      })
      .catch(err =>
        res.status(404).json({
          postnotfound: "No post found"
        })
      );
  });
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Public
router.post("/comment/:id", (req, res) => {
  //either store the user id in client side
  //use the id or use the email
  console.log("adding comment");
  User.findOne({
    _id: req.body.id
  }).then(usr => {
    Post.findById(req.params.id).then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        // id either from request or from the
        // matched email from the dbdoc
        user: usr._id
      };

      // Add to comments array
      post.comments.unshift(newComment);

      // Save
      post.save().then(post => res.json(post));
    });
  });
});

module.exports = router;
