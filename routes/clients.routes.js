const express = require("express");
const router = express.Router();

const ClientsService = require("../services/clients.service");
const clientsService = new ClientsService();

router.get("/", clientsService.getAllClients);
router.post("/", clientsService.createClient);
router.put("/:clientId", clientsService.updateClient);
router.delete("/:clientId", clientsService.deleteClient);

module.exports = router;
