import connect from "@/database/db";
import Adjective from "@/database/models/adjectives";
import Ingredient from "@/database/models/ingredients";
import { User } from "@/database/models/user";

export class usernameService {
    async generateUsername(): Promise<string> {
        await connect(); 

        let username = "";
        let isUnique = false;

        while (!isUnique) {
            const ingredient = await this.getIngredient();
            const adjective = await this.getAdjective();

            username = `${adjective}${ingredient}`;

            const existingUser = await User.findOne({ username });

            if (!existingUser) {
                isUnique = true;
            }
        }

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