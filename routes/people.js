const express = require('express');
const router = express.Router();

const { getPeople, updatePerson } = require('../controller/people');

// Cách 1: Viết riêng lẻ
router.get('/', getPeople);
router.put('/:id', updatePerson);

// Cách 2: Dùng router.route() để nhóm các phương thức cho cùng một đường dẫn (khuyên dùng)
// router.route('/').get(getPeople).post(createPerson);
// router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
