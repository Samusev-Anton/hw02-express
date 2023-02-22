const express = require("express");

const { ctrlWrraper, validation, auth } = require("../../middlewares");
const { joiSchema, joiStatusSchema } = require("../../models/contact");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrraper(ctrl.listContacts));

router.get("/:contactId", ctrlWrraper(ctrl.getContactById));

router.post("/", auth, validation(joiSchema), ctrlWrraper(ctrl.addContact));

router.delete("/:contactId", auth, ctrlWrraper(ctrl.removeContact));

router.put(
  "/:contactId",
  auth,
  validation(joiSchema),
  ctrlWrraper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validation(joiStatusSchema),
  ctrlWrraper(ctrl.updateStatus)
);

module.exports = router;
