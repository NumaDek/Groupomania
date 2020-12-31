
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
    console.log(`${req.protocol}://${req.get('host')}/images/${req.file.filename}`);
    console.log(posts);
    res.status(201).json({ message : 'Post received' });

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
        commentNbr: 420,
        comments: [
            [{ poster: 'Roberto', comment: 'Scrubo' }, { poster: 'Roberta', comment: 'Scruba' }]
        ]
    },
    {
        id: 2,
        title: 'Rage',
        description: 'Ça bug',
        imageUrl: 'http://localhost:3000/images/happy_meme_face.jpg1609402110000.jpg',
        points: 53,
        commentNbr: 420,
        comments: [
            [{ poster: 'Roberto', comment: 'Scrubo' }, { poster: 'Roberta', comment: 'Scruba' }]
        ]
    },
    {
        id: 3,
        title: 'Rainbow',
        description: 'Le serveur dit bonjour',
        imageUrl: 'http://localhost:3000/images/Rainbow.jpg1609402202262.jpg',
        points: 782,
        commentNbr: 420,
        comments: [
            [{ poster: 'Roberto', comment: 'Scrubo' }, { poster: 'Roberta', comment: 'Scruba' }]
        ]
    },
    {
        id: 4,
        title: 'So Cute',
        description: 'Le serveur dit bonjour',
        imageUrl: 'http://localhost:3000/images/socute.jpg1609402206058.jpg',
        points: 752,
        commentNbr: 420,
        comments: [
            [{ poster: 'Roberto', comment: 'Scrubo' }, { poster: 'Roberta', comment: 'Scruba' }]
        ]
    },
]