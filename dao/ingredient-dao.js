"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname,"..", "storage", "ingredients.json");

class IngredientsDao {
    constructor(storagePath) {
        this.ingredientStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
    }

    // TODO: Create, update, delete, list ingredient

    async getIngredient(id) {
        let ingredientList = await this._loadAllIngredients();
        const result = ingredientList.find((b) => b.id === id);
        return result;
    }

    async _loadAllIngredients() {
        let ingredientList;
        try {
            ingredientList = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === "ENOENT") {
                console.info("No ingredient storage found, initializing new one...");
                ingredientList = [];
            } else {
                throw new Error(
                    "Unable to read from ingredient storage. Wrong data format. " + this._getStorageLocation()
                );
            }
        }
        return ingredientList;
    }

    _getStorageLocation() {
        return this.ingredientStoragePath;
    }
}

module.exports = IngredientsDao;