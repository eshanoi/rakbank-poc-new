import React from 'react';

import {
    ContentAreaItem,
    IContentDataBase,
    IContentDataStateBase,
} from '../models/base-common-model';
import { PropertyForContentData } from './content-data-component';

class ContentAreaItemComponent extends React.Component<ContentAreaItem, IContentDataStateBase> {
    constructor(props: ContentAreaItem) {
        super(props);
        this.state = { blockId: props.contentLink.id };
    }
    _getClassName(contentData: IContentDataBase) {
        return `${contentData?.contentType?.join(' ')} col-12`;
    }
    render() {
        const { expandedValue } = this.props;
        return (
            <div className={this._getClassName(expandedValue)}>
                {expandedValue && PropertyForContentData(expandedValue, { isInContentArea: true })}
            </div>)
    }

}
export default (ContentAreaItemComponent);