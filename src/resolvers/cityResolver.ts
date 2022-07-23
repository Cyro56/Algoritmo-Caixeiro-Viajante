import { Query, Resolver } from "type-graphql";
import { CityPath } from "../entities/city";
import { v4 as uuidv4 } from "uuid";
import { DriverRoute } from "../../driver";

@Resolver()
export class Reciperesolver {
  @Query(() => [CityPath])
  getRecipes(): Array<CityPath> {
    let newPath = { id: uuidv4(), path: DriverRoute("F", "F") };
    return [newPath];
  }
}
