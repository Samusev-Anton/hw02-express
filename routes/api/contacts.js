const express = require("express");

const { ctrlWrraper, validation } = require("../../middlewares");
const { joiSchema, joiStatusSchema } = require("../../models/contact");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrraper(ctrl.listContacts));

router.get("/:contactId", ctrlWrraper(ctrl.getContactById));

router.post("/", validation(joiSchema), ctrlWrraper(ctrl.addContact));

router.delete("/:contactId", ctrlWrraper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrraper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(joiStatusSchema),
  ctrlWrraper(ctrl.updateStatus)
);

module.exports = router;
