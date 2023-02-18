// const { NotFound } = require("http-errors");
const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  console.log(result);
  if (result === "underfined") {
    throw HttpError(404, "Not Found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;
