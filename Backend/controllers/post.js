const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: 'secret',
    database: 'groupomaniadatabase'
});

// CREATE
exports.createPost = (req, res, next) => {
    console.log('Creating a post');
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
    console.log('Creating a comment');
    const token = JSON.parse(req.headers.authorization.split(' ')[1]);
    const userId = token.userId;
    let sql = "SELECT * FROM users WHERE userId = ?;";
    db.query(sql, [userId], (err, result) => {
        const posterName = result[0].firstname + ' ' + result[0].lastname;
        const comment = [
            userId,
            req.params.id,
            posterName,
            0,
            req.body.commentValue
        ]
        let sql = "UPDATE `posts` SET `commentNbr` = `commentNbr` + 1 WHERE `postId` = ?;";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
        });
        sql = "INSERT INTO `comments` (`userId`, `postId`, `posterName`, `commentPoints`, `commentValue`) VALUES (?, ?, ?, ?, ?);";
        db.query(sql, comment, (err, result) => {
            if (err) throw err;
            const payload = {
                commentId: result.insertId,
                commentPoints: 0,
                commentValue: req.body.commentValue,
                postId: req.params.id,
                posterName: posterName,
                userId: userId,
            }
            res.status(201).json(payload);
        });
    });

};

// READ
exports.getAllPost = (req, res, next) => {
    console.log('Serving all posts');
    let sql = "SELECT * FROM posts ORDER BY postId DESC;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
};

exports.getOne = (req, res, next) => {
    console.log('serving post with ID : ' + req.params.id);
    let sql = "SELECT * FROM posts WHERE postId = ?;"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0]);
    });

};

exports.getComments = (req, res, next) => {
    console.log('Serving comment for post :' + req.params.id);
    let sql = "SELECT * FROM comments WHERE postId = ? ORDER BY commentId DESC;";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
};

exports.getMine = (req, res, next) => {
    console.log('Serving post of userId :' + req.params.id);
    let sql = "SELECT * FROM posts WHERE userId = ?;"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        if (req.params.id == '1') {
            res.status(249).json({ message: 'admin' });
        }
        else
            res.status(200).json(result);
    });
};

// UPDATE
exports.like = (req, res, next) => {
    console.log('Liking post with ID :' + req.body.postId);
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
    console.log('Liking comment with ID : ' + req.body.commentId);
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
exports.deletePost = (req, res, next) => {
    console.log('Deleting post with ID : ' + req.params.id);
    const userId = (JSON.parse(req.headers.authorization.split(' ')[1])).userId;
    let sql = "SELECT * FROM posts WHERE postId = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        if (result[0] && userId == result[0].userId) {
            let sql = "DELETE FROM posts WHERE postId = ?";
            db.query(sql, [req.params.id], (err, result) => {
                if (err) throw err;
            });
            sql = "DELETE FROM comments WHERE postId = ?";
            db.query(sql, [req.params.id], (err, result) => {
                if (err) throw err;
            });
            res.status(200).json({ message: 'post deleted' });
        }
        else
            res.status(401).json({ message: 'wrong owner' });
    })
};

exports.deleteComment = (req, res, next) => {
    console.log('Deleting comment with ID : ' + req.params.id);
    const userId = (JSON.parse(req.headers.authorization.split(' ')[1])).userId;
    let sql = "SELECT * FROM comments WHERE commentId = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        if (result[0] && userId == result[0].userId) {
            sql = "DELETE FROM comments WHERE commentId = ?";
            db.query(sql, [req.params.id], (err, result) => {
                if (err) throw err;
            });
            sql = "UPDATE `posts` SET `commentNbr` = (`commentNbr` - 1) WHERE postId = ?";
            db.query(sql, [result[0].postId], (err, result) => {
                if (err) throw err;
            });
            res.status(200).json({ message: 'comment deleted.' });
        }
        else
            res.status(401).json({ message: 'wrong owner' });
    })
};