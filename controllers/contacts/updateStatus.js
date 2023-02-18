const { Contact } = require("../../models");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { status } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { status },
    {
      new: true,
    }
  );
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

module.exports = updateStatus;
