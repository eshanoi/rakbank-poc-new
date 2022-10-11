import './style.css';

import {
    Component,
    CSSProperties,
    LegacyRef,
} from 'react';

import EditAttributeFor from '../../../HOCs/editattribute-component';
import PropertyFor from '../../../HOCs/property-for-component';
import { CalloutBlockProp } from '../CalloutBlock/callout-model';
import {
    HeroProps,
    ReferencePropertyData,
} from './hero-model';

class HeroBlock extends Component<HeroProps> {
    hero: LegacyRef<HTMLDivElement> | undefined;
    constructor(props: HeroProps) {
        super(props);
        this.state = { ...props };
    }
    _renderCallout(callout: CalloutBlockProp) {
        return (<div className="screen-width-wrapper">
            <div className="hero-block__callout screen-width-container" style={{ justifyContent: callout?.calloutPosition?.value }}>
                <div className={`callout  ${callout?.padding?.value} ${callout?.margin?.value}`}
                    style={{ color: callout?.calloutTextColor?.value, textAlign: callout?.calloutContentAlignment?.value }}>
                    {PropertyFor("Callout", callout)}
                </div>
            </div>
        </div>)
    }
    _renderVideo(videoData: ReferencePropertyData) {
        return (<div className="hero-block__video">
            <video autoPlay loop playsInline muted src={videoData.value.url}>
            </video>
        </div>)
    }
    render() {
        const { mainBackgroundVideo, backgroundImage, callout } = this.props;
        const style = { paddingBottom: '50%' } as CSSProperties;
        return (
            <div className="hero-block" style={style}>
                {(<div ref={(e) => EditAttributeFor("BackgroundImage", e)} className="hero-block__image" style={{ backgroundImage: `url('${backgroundImage?.value?.url}')` }}>
                </div>)}
                {mainBackgroundVideo && !backgroundImage && (this._renderVideo(mainBackgroundVideo))}
                {this._renderCallout(callout)}

            </div>
        );
    }
}
export default HeroBlock;
