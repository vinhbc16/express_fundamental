let { people } = require('../data');



const getPeople = (req,res) => {
  res.status(200).json(people);
};


const updatePerson =  (req,res) => {
  const {id} = req.params;
  const {name} = req.body;

  const person = people.find((p) => p.id === Number(id));
  if( !person ){
    return res.status(404).json({
      success: false ,
      msg: `Khong tim thay nguoi co id la ${id}`
    });
  }
  
  const newP = people.map((p) => {
    if( p.id === Number(id) ){
        p.name = name;
    }
    return p;
  });
  res.status(200).json({
     success: true,
     data: [...newP, name]
  });
};

module.exports = { getPeople, updatePerson };