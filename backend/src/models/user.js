var Model = require("../schemas/user");

module.exports.create = data => {
  var item = new Model(data);

  return item.save();
};

module.exports.delete = reference => {
  return Model.remove({ reference: reference });
};

module.exports.read = ()=> {
  // var item = new Model();

  var item = Model.find({});

  return item;
};

exports.update = async (reference, data) => {
  return await Model.updateOne({ reference: reference }, { $set: data });
};
