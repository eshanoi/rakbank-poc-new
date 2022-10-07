import { PropertyData } from './property-data-model';

export declare interface IContentDataBase extends PropertyData {
    contentType: string[];
    componentType: string;
    contentLink: ContentLink;
    isInEditMode?: boolean;
    name: string;
    contentId: number;
}
export declare interface IContentDataStateBase {
    blockId: number;
    blockData?: IContentDataBase | null;
}
export declare interface ContentLink {
    id: number,
    workId: number;
    guidValue: string;
}
export declare interface ContentArea extends PropertyData {
    contentAreaId?: number;
    expandedValue: Array<IContentDataBase>;
}
export declare interface ContentAreaItem {
    displayOption?: string;
    contentLink: ContentLink;
    expandedValue: IContentDataBase;
}
export declare interface PropertyValue {
    propertyDataType: string;
    value: string | string[] | ContentAreaItem[];
}
export declare interface DisplayOption {
    isInContentArea?: boolean;
    displayOption?: string;
}