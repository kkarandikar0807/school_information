import { RestURLBuilder } from 'rest-url-builder';
import { UrlConstants } from '../constants/url-constants';

export class UrlBuilder {
    public static getAllSchools(): string {
        let buildUrl = new RestURLBuilder();
        buildUrl.buildRestURL(UrlConstants.baseURL);
        buildUrl.setQueryParameter('fields', 'school.name');
        buildUrl.setQueryParameter('api_key', UrlConstants.api_Key);
        return buildUrl.get();
    }
}