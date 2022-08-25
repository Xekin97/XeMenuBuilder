import type { SortRule } from "../types/index";
export class MenuSorter {
  private sortRule: SortRule;

  constructor(sortRule: SortRule) {
    this.sortRule = sortRule;
  }

  private getRuleRight(key) {
    const { sortRule } = this;
    const right = Number(sortRule[key]);
    if (Number.isNaN(right)) return -1;
    return Number(sortRule[key]);
  }

  private whoHeavy(a, b) {
    return this.getRuleRight(a["key"]) > this.getRuleRight(b["key"]);
  }

  private whoLight(a, b) {
    return this.getRuleRight(a["key"]) < this.getRuleRight(b["key"]);
  }

  getSortMethod(): Parameters<Array<any>["sort"]>[0] {
    return (a: any, b: any) => {
      if (this.whoHeavy(a, b)) {
        return 1;
      }
      if (this.whoLight(a, b)) {
        return -1;
      }
      return 0;
    };
  }
}
