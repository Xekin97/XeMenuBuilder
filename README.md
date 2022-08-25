## Usage

```typescript
    import { Dispatchers, MenuBuilder, MenuSorter } from "./menu";

    const menuRecordData = [
        { a: 1, b: 2, c: 3, d: 4 },
        { a: 11, b: 22, c: 33, d: 44 },
        { a: 111, b: 222, c: 333, d: 444 },
    ];

    type RecordItem = typeof menuRecordData[number];

    const menuDispatchers: Dispatchers<RecordItem> = {
        update: (record) => (record.b > 30 ? false : "升级"),
        test: () => "测试",
    };

    const builder = new MenuBuilder<RecordItem>({
        dispatchers: menuDispatchers,
        basicMenu: [{ key: "copy", label: "复制" }],
    });

    const sorter = new MenuSorter<RecordItem, Dispatchers<RecordItem>>({
        test: 1,
        update: 2,
        copy: 3,
    });


    // [{key: "test", label: "测试"},{ key: "copy", label: "复制" }]
    const menuOptions = builder.produceOptions(menuRecordData, sorter);

```