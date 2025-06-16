import express from "express";
import {
    create,
    delete_one,
    fetch_all,
    fetch_one,
    update_one,
} from "./notes.controller.js";
import tokenValidator from "../../middleware/tokenValidator.js";

const router = express.Router();

router.post("/create", tokenValidator, create);
router.get("/get", tokenValidator, fetch_all);
router.get("/get/:id", tokenValidator, fetch_one);
router.put("/update/:id", tokenValidator, update_one);
router.delete("/delete/:id", tokenValidator, delete_one);

export default router;
