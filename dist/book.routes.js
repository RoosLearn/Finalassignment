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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express = __importStar(require("express"));
const mongodb = __importStar(require("mongodb"));
const database_1 = require("./database");
exports.bookRouter = express.Router();
exports.bookRouter.use(express.json());
exports.bookRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield database_1.collections.books.find({}).toArray();
        res.status(200).send(books);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
//GET/books/:id
exports.bookRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const book = yield database_1.collections.books.findOne(query);
        if (book) {
            res.status(200).send(book);
        }
        else {
            res.status(404).send(`Failed to find the book: ID ${id}`);
        }
    }
    catch (error) {
        res.status(404).send(`Failed to find the book: ID ${(_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id}`);
    }
}));
//POST/books
exports.bookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const result = yield database_1.collections.books.insertOne(book);
        if (result.acknowledged) {
            res.status(201).send(`Created a new book: ID ${result.insertedId}.`);
        }
        else {
            res.status(500).send("Failed to create a new book.");
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
//PUT/books/:id
exports.bookRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
        const book = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = yield database_1.collections.books.updateOne(query, { $set: book });
        if (result && result.matchedCount) {
            res.status(200).send(`Updated a book: ID ${id}.`);
        }
        else if (!result.matchedCount) {
            res.status(404).send(`Failed to find the book: ID ${id}`);
        }
        else {
            res.status(304).send(`Failed to update the book: ID ${id}`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
//  DELETE/books/:id
exports.bookRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const id = (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = yield database_1.collections.books.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Removed a book: ID ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove the book: ID ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Failed to find the book: ID ${id}`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=book.routes.js.map