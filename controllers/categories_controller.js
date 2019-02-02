const Category = require('../models/Category')

function index(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limit = req.query.limit || 0;
    limit = Number(limit);

    Category.find({}, 'title')
        .skip(desde)
        .limit(limit)
    exec((error, categoriesDB) => {
        if (error) {
            res.status(500).json(error)
        }
        Category.collection.countDocuments({}, (error, totalc) => {
            res.status(200).json({
                categories: categoriesDB,
                total: totalc
            })
        })
    })
}

function create(req, res) {
    let body = req.body;

    let category = new Category;
    
    category.title = body.title;    

    category.save((error, categoryCreated) => {
        if (error) {
            res.status(500).json(error)
        }

        res.status(200).json({
            category: categoryCreated
        })
    })
}

function update(req, res) {
    let id = req.params.id;

    let body = req.body;

    Category.findById( id, (error, category) => {
        if (error) {
            res.status(500).json(error)
        }

        if ( !category ) {
            res.status(401).json({
                ok: false,
                message: 'La categoria con este id: '+ id +' no existe'
            })
        }

        category.title = body.title;
        category.save((error, categoryUpdated) => {
            if (error) {
                res.status(500).json({
                    message: 'Error al actualizar la categoria',
                    errors: error
                })
            }

            res.status(200).json({
                category: categoryUpdated
            })
        })
    
    
    
    })
}

function destroy(req, res) {
    let id = req.params.id;

    Category.findByIdAndDelete(id, (error, categoryDeleted) => {
        if (error) {
            res.status(500).json({
                message: 'Error al eliminar la categoria',
                errors: error
            })
        }

        res.status(200).json({
            message: 'Cateria eliminada con exito'
        })
    })
}

module.exports = {
    index,
    create,
    update,
    destroy
}