import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  indicator: {
    height: 8,
    width: 8,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeIndicator: {
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 6,
    height: 11,
    width: 11,
  },
  inactiveIndicator: {
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabnabIndicatorContainer: {
    flexDirection: 'row',
  },
  tabIndicatorRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tabActiveContainer: {
    alignItems: 'center',
  },
  tabIndicatorLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextScreenContainer: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  screenAnimatedContainer: {
    flex: 1,
  },
  rippleView: {
    position: 'absolute',
    width: 10,
    height: 10,
  },
});

export default styles;
