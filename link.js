const YML = require('yamljs')
const fs = require('fs')

let friends = [],
    data = YML.parse(fs.readFileSync('links.yml').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n'));

data.forEach((e, i) => {
    let ls   = [],
        j = 2;  //获取友链数组的范围（除了最后，前面的都获取）
    if (i < j) ls = ls.concat(e.link_list);
    fs.writeFileSync(`./${e.type}.json`, `{"link_list": ${JSON.stringify(ls)},"length":${ls.length}}`);
    console.log(`${e.type}.json 文件已生成。`);
});

data.forEach((entry, index) => {
    let lastIndex = 2;
    if (index < lastIndex) {
        friends = friends.concat(entry.link_list);
    }
});

// 根据规定的格式构建 JSON 数据
const friendData = {
    friends: friends.map(item => {
        return [item.name, item.link, item.avatar];
    })
};

// 将 JSON 对象转换为字符串
const friendJSON = JSON.stringify(friendData, null, 2);

// 写入 friend.json 文件
fs.writeFileSync('./rss.json', friendJSON);

console.log('rss.json 文件已生成。');