// Libraries
import { connect } from 'react-redux';

const Connect = ({ children, ...props }) => children(props);
const mapStateToProps = (state, props) => props.getState(state);

export default connect(mapStateToProps)(Connect);
