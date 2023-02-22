const express = require("express");

const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { auth, ctrlWrraper, validation } = require("../../middlewares");
const {
  joiSignUpSchema,
  joiSignInSchema,
  joiSubscriptionSchema,
} = require("../../models/user");

router.post("/signup", validation(joiSignUpSchema), ctrlWrraper(ctrl.signUp));

router.post("/signin", validation(joiSignInSchema), ctrlWrraper(ctrl.signIn));

router.get("/logout", auth, ctrlWrraper(ctrl.logOut));

router.patch(
  "/subscription",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrraper(ctrl.updateSubscription)
);

module.exports = router;
