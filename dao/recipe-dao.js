//S strict modem, není možné například pouřít nedeklarovaná promněne nebo je mazat
"use strict";
const fs = require("fs");
const path = require("path");

//crypto nam pak zabraní generovat duplicitní id
const crypto = require("crypto");
 
const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname,"..", "storage", "recipes.json");

class RecipesDao {
  constructor(storagePath) {
    this.recipeStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  async createRecipe(recipe){
    let recipelist = await this._loadAllRecipes();
    recipe.id = crypto.randomBytes(8).toString("hex");
    recipe.approved = false;
    recipelist.push(recipe);
    await wf(this._getStorageLocation(), JSON.stringify(recipelist, null, 2));
    return recipe;
  }

  async getRecipe(id) {
    let recipelist = await this._loadAllRecipes();
    const result = recipelist.find((b) => b.id === id);
    /*
    if(!result) {
      res.status(400).send({
        errorMessage: `category with given id ${id} does not exist`,
        params: req.body,
        reason: ajv.errors,
    });
    return;
    }
    */
    return result;
  }
  
  async updateRecipe(recipe) {
    let recipeList = await this._loadAllRecipes();
    const recipeIndex = recipeList.findIndex((b) => b.id === recipe.id);
    if (recipeIndex < 0) {
        throw new Error(`Recipe with given id ${recipe.id} does not exist.`);
    } else {
        recipeList[recipeIndex] = {
            ...recipeList[recipeIndex],
            ...recipe
        };
    }
    await wf(this._getStorageLocation(), JSON.stringify(recipeList, null, 2));
    return recipeList[recipeIndex];
  }

  async deleteRecipe(id) {
    let recipelist = await this._loadAllRecipes();
    const recipeIndex = recipelist.findIndex((b) => b.id === id);
    if (recipeIndex >= 0) {
      recipelist.splice(recipeIndex, 1);
    }
    await wf(this._getStorageLocation(), JSON.stringify(recipelist, null, 2));
    return {};
  }

  async listRecipes() {
    let recipelist = await this._loadAllRecipes();
    return recipelist;
  }

  async _loadAllRecipes() {
    let recipelist;
    try {
      recipelist = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        recipelist = [];
      } else {
        throw new Error(
          "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return recipelist;
  }

  _getStorageLocation() {
    return this.recipeStoragePath;
  }
}

module.exports = RecipesDao;
