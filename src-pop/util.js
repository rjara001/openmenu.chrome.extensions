export const getUniqueCategories = (htmlMenu) => {
    return htmlMenu.reduce(function (acc, item) {
        if (!acc.includes(item.category)) {
            acc.push(item.category);
        }
        return acc;
    }, []);
};
export const getValueClean = (value) => {
    return value === undefined ? '-' : value;
};
//# sourceMappingURL=util.js.map