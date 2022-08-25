export type ValueOf<Data> = Data[keyof Data];

export type DispatcherResult = string | false;

export type DispatcherFilter<Data> = (record: Data) => DispatcherResult;

export type DispatchRule<Data> = DispatcherFilter<Data> | DispatcherResult;

export type Dispatchers<Data> = Partial<Record<string, DispatchRule<Data>>>;

export type MenuItemKey<Dispatchers> = keyof Dispatchers;

export type MenuItemLabel<Data, Dispatchers> =
  ValueOf<Dispatchers> extends DispatcherFilter<Data>
    ? ReturnType<DispatcherFilter<Data>>
    : ValueOf<Dispatchers>;

export interface MenuItem<Data, Dispatchers> {
  key: MenuItemKey<Dispatchers>;
  label: MenuItemLabel<Data, Dispatchers>;
}

export type SortRule = Record<string, number>;
