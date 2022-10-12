import {
    Component,
    CSSProperties,
} from 'react';

const styleInline = {
    padding: "20px",
    backgroundColor: "greenyellow",
    marginTop: "30px",
    marginBottom: "30px",
    width: "100%"
} as CSSProperties;
class DefaultComponent extends Component {
    render() {
        return (
            <div className="block" style={styleInline}>
                <p>No React component found</p>
            </div>
        );
    }
}
export default DefaultComponent;
