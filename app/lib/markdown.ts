import fs = require('fs');
import path = require('path');
import { encodeDate } from './handleDate';

const mkPath = '../public/post';

export const markdown = async () => {
  const fileList = await fs.readdirSync(path.join(__dirname, mkPath));

  // 筛选.md后缀
  const markdownList = fileList.filter(filename => path.extname(filename) === '.md');

  const articleList = markdownList.map((file) => {
    const filename = path.basename(file, '.md');
    const temp = filename.split('@');
    const [ , tag, title ] = temp;
    let time = temp[0];
    time = encodeDate(time);

    return {
      time,
      tag,
      title,
      rawTime: temp[0],
    };
  });

  const techArticleList = articleList.filter(article => article.tag === 'tech');
  const liveArticleList = articleList.filter(article => article.tag === 'live');

  return {
    techArticleList,
    liveArticleList,
    allArticleList: articleList,
  };
};

export default markdown;

