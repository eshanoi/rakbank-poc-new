import DefaultComponent
    from '../../components/blocks/DefaultComponent/default-component';
import ContentAreaItemComponent from '../../HOCs/content-area-item';
import { PropertyForContentData } from '../../HOCs/content-data-component';
import {
    ContentArea,
    ContentAreaItem,
    IContentDataBase,
} from '../../models/base-common-model';
import { PropertyData } from '../../models/property-data-model';
import { componentsLazyList } from './componentRegister';

const renderNotFound = () => {
    var keyNotFound = `${Math.random()} ${Math.random()}`;
    return <DefaultComponent key={keyNotFound}></DefaultComponent>;
};
// new
const renderComponentData = (contentData: IContentDataBase) => {
    if (!contentData) {
        return (<></>)
    }
    let existedComponent = componentsLazyList.find((com) => com.typeName.includes(contentData.componentType));
    let Component = existedComponent?.component;
    if (!Component) {
        console.warn('no component found', contentData)
        return renderNotFound();
    }
    return <Component {...contentData}></Component>
};

const renderContentArea = (property: PropertyData, isInEditMode = false) => {
    if (property?.propertyDataType !== 'PropertyContentArea') {
        return (<></>);
    }
    const contentarea = property as ContentArea;
    return contentarea.expandedValue.map((component) => {
        return (
            <div key={component.contentId}>
                {component && PropertyForContentData(component, { isInContentArea: true })}
            </div>)
    }
    );
};
const renderContentAreaItem = (contentAreaItem: ContentAreaItem, isInEditMode = false) => {
    return <ContentAreaItemComponent key={contentAreaItem.contentLink.id} {...contentAreaItem}></ContentAreaItemComponent>;
};

export {
    renderComponentData,
    renderContentArea,
    renderContentAreaItem,
    renderNotFound,
};
