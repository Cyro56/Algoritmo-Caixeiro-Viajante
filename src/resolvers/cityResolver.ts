import { Query, Resolver, Arg, ArgsType } from "type-graphql";
import {
  CityPath,
  SimulationResponse,
  SimulationValues,
} from "../entities/city";
import { v4 as uuidv4 } from "uuid";
import { DriverRoute } from "../../driver";
import { simulationData } from "../database/data";
import { validateInputValue } from "../functions/validateInput";
import { LoanTax } from "../functions/loanValueByTerm";

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

  @Query(() => [SimulationValues])
  getRangeValues(): Array<SimulationValues> | unknown {
    try {
      return [simulationData];
    } catch (e) {
      return e;
    }
  }

  @Query(() => SimulationResponse)
  getValidateInput(
    @Arg("value") value: number,
    @Arg("term") term: number,
    @Arg("proposalType") ProposalType: string
  ): SimulationResponse {
    const response = validateInputValue(
      value,
      simulationData.minValue,
      simulationData.maxValue
    );

    let newValidate = {
      id: uuidv4(),
      response: response,
      loanValue: value,
      loanTerm: term,
      loanValueByTerm: LoanTax(1.5, term, value),
      loanAmountValue: LoanTax(1.5, term, value) * term,
      loanFee: simulationData.loanFee,
      loanFeeAmountValue: 1.5,
      proposalType: "REQUESTED_PROPOSAL",
    };
    try {
      return newValidate;
    } catch (e) {
      return e;
    }
  }
}
