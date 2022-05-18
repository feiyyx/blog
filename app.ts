import * as crypto from "crypto";
import { Application, IBoot } from 'egg';
import * as fs from 'fs';
import { marked } from 'marked';
import * as path from 'path';
import { markdown } from './app/lib/markdown';
let newCount = 0, updateCount = 0;
export default class FooBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  checkAndWrite(articleList) {
      if (process.env.NODE_ENV === 'production') {
        return articleList.map(async (article) => {
            const { rawTime, tag, title, hash } = article;
            const realName = `${rawTime}@${article?.tag}@${article?.title}`;
            const articleInfo = await this.app.model.Articles.findOne({
                where: {
                    title: article.title,
                },
                raw: true,
            })
            if (!articleInfo?.id) {
                const html = fs.readFileSync(path.join(__dirname, `./app/public/post/${realName}.md`), 'utf-8');
                // md转换成html
                const htmarkedHTMLml = marked(html);
                const hash = crypto.createHash('md5').update(html).digest('hex');
                newCount++;
                return this.app.model.Articles.create({
                    title,
                    tag,
                    hash,
                    content: htmarkedHTMLml,
                });
            } else if (articleInfo?.hash !== hash) {
                updateCount++;
                const html = fs.readFileSync(path.join(__dirname, `./app/public/post/${realName}.md`), 'utf-8');
                // md转换成html
                const htmarkedHTMLml = marked(html);
                const hash = crypto.createHash('md5').update(html).digest('hex');
                return this.app.model.Articles.update(
                    {
                        content: htmarkedHTMLml,
                        hash,
                    },
                    {
                        where: {
                            id: articleInfo.id,
                        },
                    }
                );
            }
            return null;
        })
      }
  }

  async willReady() {
    const articleList = await markdown();
    const checkPromises = this.checkAndWrite(articleList.allArticleList)
    try {
        console.log('>>>>>>>>>>> 正在检查文章数据中 >>>>>>>>>>>')
        await Promise.all(checkPromises);
    } catch(e) {
        throw new Error(e + '\n>>>>>>>>>>> 检查文章数据失败 >>>>>>>>>>>')
    }
    console.log('>>>>>>>>>>> 检查文章数据成功！ >>>>>>>>>>>')
    if (newCount) {
        console.log(`>>>>>>>>>>> 共新增 ${newCount} 篇文章 >>>>>>>>>>>`)
    }
    if (updateCount) {
        console.log(`>>>>>>>>>>> 共修改 ${updateCount} 篇文章 >>>>>>>>>>>`)
    }
    // All plugins have started, can do some thing before app ready.
  }
//   async didReady() {
//     // Worker is ready, can do some things
//     // don't need to block the app boot.
//     console.log('testesttest', )
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//   }

//   async serverDidReady() {
//     // Server is listening.
//     console.log('testesttest', this.app.model)
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//   }
}