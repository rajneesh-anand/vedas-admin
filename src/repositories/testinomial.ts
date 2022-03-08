import { CreateTestinomial, UpdateTestinomial } from "@ts-types/generated";
import Base from "./base";

class Testinomial extends Base<CreateTestinomial, UpdateTestinomial> {
  popularTestinomial = (url: string) => {
    return this.http(url, "get");
  };
}

export default new Testinomial();
