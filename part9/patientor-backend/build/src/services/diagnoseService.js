"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnose_1 = __importDefault(require("../../data/diagnose"));
const getEntries = () => {
    return diagnose_1.default;
};
exports.default = {
    getEntries
};
