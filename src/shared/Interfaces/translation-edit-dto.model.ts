export interface ITranslationEditDto {
    name: string | undefined;
    title: string | undefined;
    description: string | undefined;
    language: string | undefined;
    metaKeywords: string | undefined;
    metaTitle: string | undefined;
    metaDescription: string | undefined;
    shortDescription: string | undefined;
    fullDescription: string | undefined;
    adminComment: string | undefined;
    companyName: string | undefined;
    conditions: string | undefined;
    termsAndConditions: string | undefined;
    termsConditions: string | undefined;
    zone: string | undefined;
    duration : string | undefined;
    masterCard: string | undefined;
  
  }
  
  export class TranslationEditDto implements ITranslationEditDto {
    static fromJS(data: any): TranslationEditDto {
      data = typeof data === 'object' ? data : {};
      const result = new TranslationEditDto();
      result.init(data);
      return result;
    }
    name: string | undefined;
    title: string | undefined;
    description: string | undefined;
    language: string | undefined;
    metaKeywords: string| undefined;
    metaTitle: string | undefined;
    metaDescription: string | undefined;
    shortDescription: string | undefined;
    fullDescription: string | undefined;
    adminComment: string | undefined;
    companyName: string | undefined;
    conditions: string | undefined;
    termsAndConditions: string | undefined;
    termsConditions: string | undefined;
    zone: string;
    duration : string | undefined;
    masterCard: string | undefined;
  
    constructor(data?: ITranslationEditDto) {
      if (data) {
        // tslint:disable-next-line:forin
        for (const property in data) {
          const newLocal = this;
          if (data.hasOwnProperty(property)) {
            (<any>newLocal)[property] = (<any>data)[property];
          }
        }
      }
    }
  
  
    init(_data?: any) {
      if (_data) {
        this.name = _data['name'];
        this.title = _data['title'];
        this.description = _data['description'];
        this.language = _data['language'];
        this.metaKeywords = _data['metaKeywords'];
        this.metaTitle = _data['metaTitle'];
        this.metaDescription = _data['metaDescription'];
        this.shortDescription = _data['shortDescription'];
        this.fullDescription = _data['fullDescription'];
        this.adminComment = _data['adminComment'];
        this.companyName = _data['companyName'];
        this.conditions = _data['conditions'];      
        this.termsAndConditions = _data['termsAndConditions'];      
        this.termsConditions = _data['termsConditions'];      
        this.zone = _data['zone'];      
        this.duration = _data['duration'];      
        this.masterCard = _data['masterCard'];      
  
  
      }
    }
  
    toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data['name'] = this.name;
      data['title'] = this.title;
      data['description'] = this.description;
      data['language'] = this.language;
      data['metaKeywords'] = this.metaKeywords;
      data['metaTitle'] = this.metaTitle;
      data['metaDescription'] = this.metaDescription;
      data['shortDescription'] = this.shortDescription;
      data['fullDescription'] = this.fullDescription;
      data['adminComment'] = this.adminComment;
      data['companyName'] = this.companyName;
      data['conditions'] = this.conditions;
      data['termsAndConditions'] = this.termsAndConditions; 
      data['termsConditions'] = this.termsConditions; 
      data['zone'] = this.zone; 
      data['duration'] = this.duration; 
      data['masterCard'] = this.masterCard; 
      
      return data;
    }
  
    clone(): TranslationEditDto {
      const json = this.toJSON();
      const result = new TranslationEditDto();
      result.init(json);
      return result;
    }
  }
  