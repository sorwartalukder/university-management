const adminPaths2 = [
    1, 2, 3
];
const adminSidebarItems = adminPaths2.reduce((acc, item) => {

    console.log(acc)
    acc.push(acc + item)
    return acc
}, [])
console.log(adminSidebarItems)
