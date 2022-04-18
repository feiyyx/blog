import axios from "axios";
import * as crypto from "crypto";
import { Controller } from 'egg';
const secret = 'NcPYr6No06Dg1DODGvrI';
const url = 'https://fanyi-api.baidu.com/api/trans/vip/translate'; // baidu api

export default class ApiController extends Controller {
    public async translate() {
        const { ctx } = this;
        const query = ctx.query;
        let content = query.content.split('\n').filter(v => !!v);
        const params = {
            q: '',
            from: 'zh',
            to: 'en',
            appid: '20200313000397548',
            salt: 'feiyyx',
            sign: '',
        };

        const translateList = content.map((item, index) => {
            const query = {
                ...params,
            }
            if (item.includes('、')) {
                query.q = item.split('、').filter(v => !!v).join('，');
            } else {
                query.q = item;
            }
            const { q, appid, salt } = query;
            query.sign = this.sign(q, appid, salt);
            console.log(`>>>>>>>>>>>>>> 翻译枚举值[${index}]: `, q);
            return axios.get(url ,{ params: query })
        })

        try {
            let tranlateRes = await Promise.all(translateList);
            tranlateRes = tranlateRes.map((res, index)=> {
                console.log(res.data)
                let content = res.data.trans_result[0].dst;
                console.log(`<<<<<<<<<<<<<< 翻译结果[${index}]: `, content);
                // 把一组枚举重新化成数组
                content = content.split(', ')
                    .map(v => v.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())) // 将所有首字母全部大写
                    .filter(v => !!v);
                // 在这一步化为代码
                content = this.formatCode(content);

                return content;
            });
            return ctx.body = {
                message: tranlateRes,
            }
        } catch(error) {
            console.log(error);
            ctx.response.status = 404;
            ctx.response.message = 'error result';
        }
    }

    sign(query, appid, salt) {
        const contents = appid + query + salt + secret;
        return crypto.createHash('md5').update(contents).digest("hex");
    }

    formatCode(enumArr: Array<String>) {
        const enumTypeName = enumArr[0].replace(' ', '_').toUpperCase();
        const enumList: Array<String> = [];
        const enumMap: Array<String> = [];
        enumArr.map((val, index) => {
            if (index === 0) return; // 跳过枚举类型
            // 将单词变成下划线大写格式
            const enumName = val.replace(' ', '_').toUpperCase();
            enumList.push(`\t${enumName}: ${index - 1},`) // key: val
            enumMap.push(`\t[${enumTypeName}.${enumName}]: '${val}',`)// [enum.key]: key
        })
        return `// ${enumTypeName}\nconst ${enumTypeName} = {\n${enumList.join('\n')}\n};\nconst ${enumTypeName}_MAP = {\n${enumMap.join('\n')}\n};\n`
    }
}
