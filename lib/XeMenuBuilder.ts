import type {
  MenuItem,
  Dispatchers,
  MenuItemKey,
  MenuItemLabel,
} from "../types/index";
import type { MenuSorter } from "./XeMenuSorter";

export interface Config<Data> {
  dispatchers: Dispatchers<Data>;
  sorter?: MenuSorter;
  basicMenu?: MenuItem<Data, Dispatchers<Data>>[];
}

export class MenuBuilder<Data> {
  private basicMenu: MenuItem<Data, Dispatchers<Data>>[];
  private dispatchers: Dispatchers<Data>;
  private sorter?: MenuSorter;

  constructor(config: Config<Data>) {
    this.dispatchers = config.dispatchers;
    this.basicMenu = config.basicMenu || [];
    this.sorter = config.sorter;
  }

  public setDispatchers(dispatchers: any) {
    this.dispatchers = dispatchers;
  }

  public setSorter(sorter: any) {
    this.sorter = sorter;
  }

  produceOptions(
    materials: Data[],
    sorter?: MenuSorter
  ): MenuItem<Data, Dispatchers<Data>>[] {
    const unValidSet = new Set<string>();
    const optionsMap = materials.reduce((acc, record) => {
      for (const key in this.dispatchers) {
        const rule = this.dispatchers[key];
        const label = typeof rule === "function" ? rule(record) : rule;
        if (!label) unValidSet.add(key);
        if (label && !acc[key]) {
          acc[key] = label;
        }
      }
      return acc;
    }, {} as Record<MenuItemKey<Dispatchers<Data>>, MenuItemLabel<Data, Dispatchers<Data>>>);

    const options = [...Object.entries(optionsMap)]
      .map(([key, label]) => ({
        key,
        label,
      }))
      .filter((item) => !unValidSet.has(item.key)) as MenuItem<
      Data,
      Dispatchers<Data>
    >[];

    return [...this.basicMenu, ...options].sort(
      (sorter || this.sorter)?.getSortMethod()
    );
  }
}
