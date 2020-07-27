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
    marginBottom: 8,
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

  password: {
    fontSize: 22,
  },

  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },

  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },

  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: Colors.lightRed,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
