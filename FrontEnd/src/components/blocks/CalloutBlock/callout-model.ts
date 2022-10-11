import { IContentDataBase } from '../../../models/base-common-model';
import { PropertyData } from '../../../models/property-data-model';

export declare interface CalloutBlockProp extends IContentDataBase {
    calloutContent: PropertyData;
    calloutPosition: PropertyData;
    calloutContentAlignment: PropertyData;
    calloutTextColor: PropertyData;
    backgroundColor: PropertyData;
    calloutOpacity: PropertyData;
    padding: PropertyData;
    margin: PropertyData;
}