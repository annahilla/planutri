import connect from "@/database/db";
import Adjective from "@/database/models/adjectives";
import Ingredient from "@/database/models/ingredients";

export class usernameService {
    async generateUsername() {
        await connect(); 

        const ingredient = await this.getIngredient();
        const adjective = await this.getAdjective();

        const username = `${adjective}${ingredient}`;
        return username;
    }

    private async getIngredient() {
        const ingredientsObject = await Ingredient.find(); 
        const ingredientsArray = ingredientsObject[0].ingredients; 
        if (ingredientsArray.length === 0) return null;

        const randomIngredient = ingredientsArray[Math.floor(Math.random() * ingredientsArray.length)];
        return this.formatToLowercase(randomIngredient);
    }

    private async getAdjective() {
        const adjectivesObject = await Adjective.find();
         const adjectivesArray = adjectivesObject[0].adjectives;
        if (adjectivesArray.length === 0) return null;

        const randomAdjective = adjectivesArray[Math.floor(Math.random() * adjectivesArray.length)];
        return this.formatToLowercase(randomAdjective);
    }

    private formatToLowercase(text: string): string {
        return text.trim().replace(/\s+/g, "").toLowerCase();
    }

}