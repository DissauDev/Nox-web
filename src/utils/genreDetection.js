"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectGenre = void 0;
var bpmData_1 = __importDefault(require("./bpmData"));
var detectGenre = function (bpm) {
    var genre = bpmData_1.default.find(function (data) { return bpm >= data.bpmRange[0] && bpm <= data.bpmRange[1]; });
    return genre ? genre.genre : "Unknown";
};
exports.detectGenre = detectGenre;
