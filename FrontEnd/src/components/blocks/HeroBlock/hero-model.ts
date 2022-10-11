import {
    ContentLink,
    IContentDataBase,
} from '../../../models/base-common-model';
import { PropertyData } from '../../../models/property-data-model';
import { CalloutBlockProp } from '../CalloutBlock/callout-model';

export declare interface HeroProps extends IContentDataBase {
    backgroundImage: ReferencePropertyData;
    mainBackgroundVideo: ReferencePropertyData;
    blockRatio: PropertyData;
    padding: PropertyData;
    margin: PropertyData;
    callout: CalloutBlockProp;
}
export declare interface ReferencePropertyData extends PropertyData {
    value: ReferenceData;
}
export declare interface ReferenceData extends ContentLink {
    url: string;
}