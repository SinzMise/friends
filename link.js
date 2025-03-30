const YML = require('yamljs')
const fs = require('fs')

let ls   = [],
    data = YML.parse(fs.readFileSync('links.yml').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n'));

data.forEach((e, i) => {
    let j = 2;  //获取友链数组的范围（除了最后，前面的都获取）
    if (i < j) ls = ls.concat(e.link_list)
});
fs.writeFileSync('./flink.json', `{"link_list": ${JSON.stringify(ls)},"length":${ls.length}}`)
console.log('flink.json 文件已生成。');