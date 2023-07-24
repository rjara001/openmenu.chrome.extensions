"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueCategories = void 0;
const getUniqueCategories = (htmlMenu) => {
    return htmlMenu.reduce(function (acc, item) {
        if (!acc.includes(item.category)) {
            acc.push(item.category);
        }
        return acc;
    }, []);
};
exports.getUniqueCategories = getUniqueCategories;
//# sourceMappingURL=util.js.map