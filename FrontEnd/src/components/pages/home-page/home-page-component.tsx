import PropertyFor from '../../../HOCs/property-for-component';
import { HomePage } from './home-page';

function HomPageComponent(props: HomePage) {

    return (
        <div>
            <div>
                <h2>{PropertyFor("MetaTitle", props.metaTitle)}</h2>
            </div>
            <div><h2>{PropertyFor("TeaserRatio", props.teaserRatio)}</h2>
            </div>
            <h2>{PropertyFor("MainBody", props.mainBody)}</h2>
            {PropertyFor("BottomContentArea", props.bottomContentArea)}
        </div>
    )
}
export default HomPageComponent;
