import { IContentDataBase } from '../../../models/base-common-model';
import { PropertyData } from '../../../models/property-data-model';

export declare interface HomePage extends IContentDataBase {
    bottomContentArea: PropertyData
    mainBody: PropertyData,
    teaserRatio: PropertyData;
    metaTitle: PropertyData;
}