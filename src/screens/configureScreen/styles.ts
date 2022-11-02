import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  actionHeaderContainer: {
    elevation: 2,
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'center',
  },
  actionItemContainer: {
    elevation: 1,
    backgroundColor: 'rgba(77,151,255,.25)',
    flexDirection: 'row',
    height: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    paddingVertical: 5,
  },
  itemTitle: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },

  sectionHeadres: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    flex: 1,
  },
  stackedItem: {
    textAlign: 'center',
    flex: 1,
  },
  stackedItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 5,
    marginStart: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  dragabblePoint: {backgroundColor: 'red', paddingHorizontal: 8},
  point: {fontSize: 20, paddingHorizontal: 8},
  configHeaderContainer: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
});
