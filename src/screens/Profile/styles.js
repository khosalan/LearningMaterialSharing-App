import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    marginVertical: 10,
  },

  container: {
    paddingHorizontal: 20,
  },

  editable: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  title: {
    marginBottom: 5,
  },

  infoContainer: {
    marginTop: 10,
    marginBottom: 5,
  },

  label: {
    fontSize: 18,
    marginBottom: 8,
    color: Colors.darkGray,
  },

  info: {
    color: Colors.darkGray,
    fontSize: 16,
  },

  editableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  editableLabel: {
    fontSize: 18,
    marginBottom: 5,
  },

  editableInfo: {
    fontSize: 16,
  },

  icon: {
    fontSize: 24,
    marginTop: 10,
    marginRight: 10,
  },

  deleteContainer: {
    marginVertical: 20,
  },

  deleteText: {
    color: Colors.red,
    alignSelf: 'flex-start',
  },
});

export default styles;
