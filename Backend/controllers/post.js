
// CREATE
exports.create = (req, res, next) => {
    console.log('create ');
    console.log(req.body);
    res.status(201).json({ message : 'Post received' });

};

// READ
exports.getAll = (req, res, next) => {
    console.log('getAll ' + req.body);
    res.status(200);

};

exports.getOne = (req, res, next) => {
    console.log('getOne ' + req.body);
    res.status(200);

};

// UPDATE
exports.update = (req, res, next) => {
    console.log('update ' + req.body);
    res.status(200);

};

exports.like = (req, res, next) => {
    console.log('like ' + req.body);
    res.status(200);

};

// DELETE
exports.delete = (req, res, next) => {
    console.log('delete ' + req.body);
    res.status(200);
};
