import { inject, injectable } from "inversify";
import { IAbiRepository } from "./repositories.interface";
import Abi from "../models/abi.model";
import { IAbiDto } from "../../common/dtos";

@injectable()
export default class AbiRepository implements IAbiRepository {
  constructor() {}

  async create(data: IAbiDto): Promise<void> {
    const newAbi = new Abi(data);
    await newAbi.save();
  }

  async getAbi(address: string): Promise<IAbiDto | null> {
    return Abi.findOne({
      address,
    });
  }
}
