import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange,
  },

  header: {
    flex: 3,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  about: {
    alignItems: 'center',
  },

  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },

  title: {
    color: '#05375a',
    fontSize: 25,
    fontWeight: 'bold',
  },

  text: {
    color: 'grey',
    marginTop: 15,
    fontSize: 16,
    fontSize: 18,
  },

  getStart: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    borderColor: Colors.blue,
    borderWidth: 1,
    alignSelf: 'flex-end',
    marginTop: 30,
  },

  textStart: {
    fontWeight: 'bold',
    marginRight: 5,
  },

  label: {
    fontSize: 18,
    marginBottom: 5,
  },

  me: {
    fontSize: 16,
  },
});

export default styles;
