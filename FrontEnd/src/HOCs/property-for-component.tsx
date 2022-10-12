import { IContentDataBase } from '../models/base-common-model';
import { PropertyData } from '../models/property-data-model';
import {
    renderComponentData,
    renderContentArea,
} from '../utils/component-extensions/component-renderer';

export default function PropertyFor(keyName: string, property: PropertyData) {
    if (!keyName) {
        return (<></>)
    }
    const isInEditMode = window.isEditMode;
    function renderProperty(type: string) {
        let childrenElement: JSX.Element[] | JSX.Element = [];
        switch (type) {
            case 'PropertyContentArea':
                childrenElement = renderContentArea(property, isInEditMode);
                break;
            case 'PropertyBlock':
                const propertyBlock = property as unknown as IContentDataBase;
                childrenElement = renderComponentData(propertyBlock);
                break;
            case 'PropertyXhtmlString':
                childrenElement = (<div dangerouslySetInnerHTML={{ __html: property?.value }}></div>);
                break;
            default:
                childrenElement = (<>{property?.value}</>);
        }
        return isInEditMode
            ? (<div className="epi-editContainer" data-epi-property-name={keyName} data-epi-use-mvc="True">{childrenElement}</div>)
            : childrenElement;
    }
    return renderProperty(property?.propertyDataType);
}

