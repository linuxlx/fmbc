import { connect } from 'dva';
import { get } from 'lodash';
import Description from './description';

const mapStateToProps = state => ({
  descriptionData: get(state, 'common.appConf.description'),
})

// const mapDispatchToProps = dispatch => ({

// })

export default connect(mapStateToProps)(Description);
