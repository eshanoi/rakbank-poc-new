import {
    DisplayOption,
    IContentDataBase,
} from '../models/base-common-model';
import {
    renderComponentData,
} from '../utils/component-extensions/component-renderer';

export function PropertyForContentData(contentData: IContentDataBase, displayOption: DisplayOption | null = null) {
    const isInEditMode = window.isEditMode;
    function _getClassName(contentData: IContentDataBase) {
        return `${contentData?.contentType?.join(' ')} ${displayOption?.displayOption}`;
    }
    return (
        <div className="content-item">
            {contentData
                && (isInEditMode && displayOption?.isInContentArea
                    ? (<div className={_getClassName(contentData)}
                        data-contentgroup=""
                        data-epi-block-id={contentData?.contentLink?.id}
                        data-epi-block-info="{&quot;missingrenderer&quot;:false}"
                        data-epi-content-name={contentData.name}>
                        {renderComponentData(contentData)}
                    </div>)
                    : renderComponentData(contentData))}
        </div>)
}