import { searchEngineMap } from './config';
import open from 'open';
import chalk from 'chalk';
import type { ITranslateEngine } from './type';
const DEFAULT_SEARCH_URL = 'https://www.bing.com/search?q=';

const isChineseContained = (str: string) => /[\u4E00-\u9FA5]+/.test(str);
const translateSiteMap = (engineName: string, query: string, isEn?: boolean) => {
  const siteMap = {
    'google-translate': isEn ? `en&tl=zh-CN&text=${query}` : `zh-CN&tl=en&text=${query}`,
    'deepl-translate': isEn ? `en/zh/${query}` : `zh/en/${query}`,
    'baidu-translate': isEn ? `en/zh/${query}` : `zh/en/${query}`,
  };

  return siteMap[engineName as ITranslateEngine];
};
export const searchHandler = async (engine: string, query: string) => {
  let searchUrl = '';
  try {
    if (!engine || !query) {
      console.log(chalk.red('engine and query can not be empty'));
      console.log(chalk.gray('use ds -h or ds --help to get some helps'));
      process.exit(0);
    }
    const engineObj = searchEngineMap.find((item) => item.abbr.includes(engine) || item.name === engine);
    // 不支持的引擎时，使用默认引擎
    if (!engineObj) {
      searchUrl = DEFAULT_SEARCH_URL;
      console.log(chalk.gray('invalid search engine, it will use the default search engine(being search)'));
    } else {
      searchUrl = engineObj.searchUrl;
    }

    // 单独处理翻译引擎，因为各个翻译引擎入参有差别
    if (engineObj?.type === 'translate') {
      const isAllEnglish = !isChineseContained(query);
      const transQuery = translateSiteMap(engineObj.name, query, isAllEnglish);
      open(`${searchUrl}${transQuery}`);
    } else {
      open(`${searchUrl}${query}`);
    }
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};
