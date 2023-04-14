"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const book_routes_1 = require("./book.routes");
const path = __importStar(require("path"));
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
const { ATLAS_URI } = process.env;
if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}
(0, database_1.connectToDatabase)(ATLAS_URI)
    .then(() => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use("/books", book_routes_1.bookRouter);
    // start the Express server
    app.listen(5200, () => {
        console.log(`Server running at http://localhost:5200...`);
    });
})
    .catch(error => console.error(error));
//hosting to cyclic
const app = (0, express_1.default)();
app.use(express_1.default.static(path.join(__dirname, 'dist', 'mylibrary')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'mylibrary', 'index.html'));
});
//# sourceMappingURL=server.js.map