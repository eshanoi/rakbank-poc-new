import {
  Component,
  CSSProperties,
} from 'react';

const styleInline = {
  // color: "red",
  padding: "20px",
  bgColor: "red",
  backgroundColor: "red",
  marginTop: "10px",
  marginBottom: "20px",
} as CSSProperties;
class DefaultComponent extends Component {
  render() {
    return (
      <div className="block" style={styleInline}>
        <p>No component found</p>
      </div>
    );
  }
}
export default DefaultComponent;
