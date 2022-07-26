import { Query, Resolver, Arg, ArgsType } from "type-graphql";
import { CityPath } from "../entities/city";
import { v4 as uuidv4 } from "uuid";
import { DriverRoute } from "../../driver";

@Resolver()
export class Reciperesolver {
  @Query(() => [CityPath])
  getRecipes(
    @Arg("initial") initial: string,
    @Arg("final") final: string
  ): Array<CityPath> {
    let newPath = { id: uuidv4(), path: DriverRoute(initial, final) };

    try {
      return [newPath];
    } catch (e) {
      return e;
    }
  }
}
