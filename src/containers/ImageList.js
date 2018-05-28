import { connect } from 'react-redux';
import ImageList from '../components/ImageList';

const mapStateToProps = state => {
  return {
    urlList: state.ImageUrls,
  };
};

export default connect(mapStateToProps, null)(ImageList);
