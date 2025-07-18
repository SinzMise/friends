const YML = require('yamljs')
const fs = require('fs')

let friends = [],
    data = YML.parse(fs.readFileSync('links.yml').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n'));

data.categories.forEach((entry, index) => {
    let lastIndex = 2;
    if (index < lastIndex) {
        friends = friends.concat(entry.links);
    }
});

// 根据规定的格式构建 JSON 数据
const friendData = {
    friends: friends.map(item => {
        return [item.name, item.url, item.avatar];
    })
};

// 将 JSON 对象转换为字符串
const friendJSON = JSON.stringify(friendData, null, 2);

// 写入 friend.json 文件
fs.writeFileSync('./rss.json', friendJSON);

console.log('rss.json 文件已生成。');