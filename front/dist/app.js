"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Set up routes
(0, index_1.setRoutes)(app);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
