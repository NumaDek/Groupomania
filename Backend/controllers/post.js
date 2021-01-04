
// CREATE
exports.create = (req, res, next) => {
    const formData = JSON.parse(req.body.payload);
    const post = {
        id: posts.length + 1,
        title: formData.title,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        description: formData.description,
        points: 0,
        commentNbr: 0,
        comments: []
    };
    posts.push(post);
    res.status(201).json({ message : 'Post received' });
};

exports.create = (req, res, next) => {
    console.log(req.body);
    const comment = {
        userId: req.body.userId,
        postId: req.params.id,
        commentId: comments.length,
        name: req.body.userId, // Select le users !
        commentPoints: 0,
        commentValue: req.body.comment
    }
    comments.push(comment)
    res.status(201).json(comment);
};
// READ
exports.getAll = (req, res, next) => {
    console.log('serving posts');
    res.status(200).json(posts);
};

exports.getOne = (req, res, next) => {
    console.log('serving post : ' + req.params.id);
    res.status(200).json(posts[req.params.id - 1]);
};

exports.getComments = (req, res, next) => {
    // Select les comments avec le postId == req.params.id;
    res.status(200).json(comments);
};

exports.getMine = (req, res, next) => {
    // Select les post avec le userId == req.params.id
    console.log('serving post of userId :' + req.params.id);
    userId = JSON.parse(req.headers.authorization.split(' ')[1]).userId;
    if (userId == 'azertyuiop0')
        res.status(200).json({ message: 'admin' });
    else
        res.status(200).json(posts);
};

// UPDATE
exports.update = (req, res, next) => {
    console.log('update ' + req.body);
    res.status(200);

};

exports.like = (req, res, next) => {
    console.log('Liking uncontroled.');
    posts[req.body.id - 1].points += req.body.like;
    res.status(200).json({ message: req.body });
};

exports.commentLike = (req, res, next) => {
    console.log('Comment Liking uncontroled.');
    comments[req.params.id].commentPoints += req.body.like;
    res.status(200).json({ message: req.body });
};

// DELETE
exports.delete = (req, res, next) => {
    console.log('delete ' + req.body);
    res.status(200);
};

const posts = [
    {
        id: 1,
        title: 'Hello There',
        description: 'Le serveur dit bonjour',
        imageUrl: 'http://localhost:3000/images/Hello_There.jpg1609397792393.jpg',
        points: 69,
        commentNbr: 420
    },
    {
        id: 2,
        title: 'Rage',
        description: 'Ça bug',
        imageUrl: 'http://localhost:3000/images/happy_meme_face.jpg1609402110000.jpg',
        points: 53,
        commentNbr: 420
    },
    {
        id: 3,
        title: 'Rainbow',
        description: 'Le serveur dit bonjour',
        imageUrl: 'http://localhost:3000/images/Rainbow.jpg1609402202262.jpg',
        points: 782,
        commentNbr: 420
    },
    {
        id: 4,
        title: 'So Cute',
        description: 'Le serveur dit bonjour',
        imageUrl: 'http://localhost:3000/images/socute.jpg1609402206058.jpg',
        points: 752,
        commentNbr: 420
    },
]

const comments = [
    { userId: 'azertyuiop0', postId: '0', commentId: 0, name: 'Numa Dekeyser', commentPoints: 15, commentValue: 'Hahaha !' },
    { userId: 'azertyuiop0', postId: '1', commentId: 1, name: 'Jean pierre', commentPoints: 20, commentValue: 'C\'est drole.' }
]