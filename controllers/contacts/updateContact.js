const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new HttpError(404, `Not Found ID=${contactId}`);
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
