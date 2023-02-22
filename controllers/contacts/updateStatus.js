const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
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

module.exports = updateStatus;
