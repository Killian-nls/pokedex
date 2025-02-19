"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    getHomePage(req, res) {
        res.sendFile('index.html', { root: 'public' });
    }
    apiResponse(req, res) {
        res.json({ message: 'Hello from the API!' });
    }
}
exports.default = IndexController;
