export type ITranslateEngine = 'google-translate' | 'baidu-translate' | 'deepl-translate';
export interface ISearchEngine {
  name: string;
  cname?: string;
  abbr: string[];
  type: 'engine' | 'website' | 'video' | 'translate';
  searchUrl: string;
}
