"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = void 0;
const express_1 = require("express");
const index_1 = require("../controllers/index");
const router = (0, express_1.Router)();
const indexController = new index_1.IndexController();
function setRoutes(app) {
    app.use('/', router);
    router.get('/', indexController.renderHomePage);
    // Add more routes as needed
}
exports.setRoutes = setRoutes;
