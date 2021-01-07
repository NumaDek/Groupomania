const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: 'secret',
    database: 'groupomania'
});

// CREATE
exports.create = (req, res, next) => {
    const formData = JSON.parse(req.body.payload);
    const post = [
        formData.userId,
        formData.title,
        formData.description,
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        0,
        0
    ];
    let sql = "INSERT INTO `posts`(`userId`, `title`, `description`, `imageUrl`, `points`, `commentNbr`) VALUE(?, ?, ?, ?, ?, ?);";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'Post received' });
    });
};

exports.createComment = (req, res, next) => {
    const comment = [
        req.body.userId,
        req.params.id,
        'oops',
        0,
        req.body.commentValue
    ]
    let sql = "INSERT INTO `comments` (`userId`, `postId`, `posterName`, `commentPoints`, `commentValue`) VALUES (?, ?, ?, ?, ?);";
    db.query(sql, comment, (err, result) => {
        if (err) throw err;
        res.status(201).json(comment);
    });
};

// READ
exports.getAll = (req, res, next) => {
    console.log('serving posts');
    let sql = "SELECT * FROM posts;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
};

exports.getOne = (req, res, next) => {
    console.log('serving post : ' + req.params.id);
    let sql = "SELECT * FROM posts WHERE postId = ?;"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0]);
    });

};

exports.getComments = (req, res, next) => {
    let sql = "SELECT * FROM comments WHERE postId = ?;";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });

};

exports.getMine = (req, res, next) => {
    console.log('serving post of userId :' + req.params.id);
    let sql = "SELECT * FROM posts WHERE userId = ?;"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        if (req.params.id == '1')
            res.status(200).json({ message: 'admin' });
        else
            res.status(200).json(result);
    });
};

// UPDATE
exports.update = (req, res, next) => {
    console.log('update ' + req.body);
    res.status(200);
};

exports.like = (req, res, next) => {
    console.log('Liking uncontroled.');
    let like = 0;
    if (req.body.like == 1)
        like = 1;
    else
        like = -1;
    let sql = "UPDATE `posts` SET `points` = (`points` + ?) WHERE `postId` = ?;";
    db.query(sql, [like, req.body.postId], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: req.body });
    })
};

exports.commentLike = (req, res, next) => {
    console.log('Comment Liking uncontroled.');
    let like = 0;
    if (req.body.like == 1)
        like = 1;
    else
        like = -1;
    let sql = "UPDATE `comments` SET `commentPoints` = (`commentPoints` + ?) WHERE `commentId` = ?;";
    db.query(sql, [like, req.body.commentId], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: req.body });
    })
};

// DELETE
exports.delete = (req, res, next) => {
    console.log('delete ' + req.body);
    res.status(200);
};