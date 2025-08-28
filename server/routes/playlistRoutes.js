import express from "express";
import * as playlistController from "../controllers/playlistController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, playlistController.createPlaylist);

router.get("/", playlistController.getAllPlaylists);

router.get("/:id", playlistController.getPlaylistById);

router.put("/:id", verifyToken, playlistController.updatePlaylist);


router.delete("/:id", verifyToken, playlistController.deletePlaylist);

export default router;

