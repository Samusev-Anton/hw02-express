const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found ID=${contactId}`,
    });
  }
  res.json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
