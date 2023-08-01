export const getUniqueCategories = (htmlMenu:any[]) => {
    return htmlMenu.reduce(function (acc, item) {
        if (!acc.includes(item.category)) {
            acc.push(item.category);
        }
        return acc;
    }, []);
}

export const getValueClean = (value:string) => {
    return (value === undefined || value === 'undefined') ? '-' : value;
}