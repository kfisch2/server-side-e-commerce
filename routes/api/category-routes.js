const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name'],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => res.status(500).json(err));
});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    attributes: ['id', 'category_name'],
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['product_name'],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => res.json(err));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => res.json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({ message: 'Category with that id does not exist' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({ message: 'Category with that id does not exist' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
