import PropertyFor from '../../../HOCs/property-for-component';
import { CalloutBlockProp } from './callout-model';

export default function HeroBlockCallout(props: CalloutBlockProp) {
    return (<div className="hero-block__callout-content">
        {PropertyFor("CalloutContent", props.calloutContent)}
    </div>)
}