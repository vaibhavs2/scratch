import React, {useRef, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  LayoutRectangle,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {randomIntFromInterval} from '../../Utils';
import ConfigureScreen from '../configureScreen';
import {Sprite, Sprites} from './components/Sprites';
import {styles} from './Styles';
import {AnimatebleComponent} from '../../commonComponent/AnimatebleComponent';
import {Action} from '../../types';

export default function HomeScreen() {
  const [getSelectedSprites, setSelectedSprites] = useState<
    Array<Sprite & {x: number; y: number; actions: Array<Action>}>
  >([{icon: 'empire', x: 120, y: 190, actions: []}]);

  const [getShowConfiguration, setShowConfiguration] = useState(false);
  const [getDraggableBoundary, setDraggableBoundary] =
    useState<LayoutRectangle>({height: 0, width: 0, x: 0, y: 0});
  const selectedSpriteToConfigure = useRef(0);
  const [getPlay, setPlay] = useState(false);

  const onSpriteChange = (icon: string, added: boolean) => {
    if (added)
      setSelectedSprites([
        {
          icon,
          y: randomIntFromInterval(100, 150),
          x: randomIntFromInterval(100, 150),
          actions: [],
          selected: false,
        },
        ...getSelectedSprites,
      ]);
    else setSelectedSprites(getSelectedSprites.filter(obj => obj.icon != icon));
  };

  const changeConfigModal = (_: Sprite, index: number) => {
    selectedSpriteToConfigure.current = index;
    setShowConfiguration(!getShowConfiguration);
  };

  const longPressforPlayTogether = (item: Sprite, index: number) => {
    ReactNativeHapticFeedback.trigger('impactLight');
    getSelectedSprites[index].selected = !getSelectedSprites[index].selected;
    setSelectedSprites([...getSelectedSprites]);
  };

  const resetDrags = () => {
    setSelectedSprites(
      getSelectedSprites.map(item => ({
        ...item,
        y: randomIntFromInterval(100, 150),
        x: randomIntFromInterval(100, 150),
      })),
    );
  };

  const onConfigScreenChange = () => {
    setShowConfiguration(!getShowConfiguration);
  };

  const onActionUpdate = (action: Action, actionIndex: number) => {
    if (actionIndex == -1) {
      getSelectedSprites[selectedSpriteToConfigure.current].actions.push(
        action,
      );
      setSelectedSprites([...getSelectedSprites]);
    } else {
      getSelectedSprites[selectedSpriteToConfigure.current].actions =
        getSelectedSprites[selectedSpriteToConfigure.current].actions.filter(
          (_, index) => index != actionIndex,
        );
      setSelectedSprites([...getSelectedSprites]);
    }
  };

  const onPlayClick = () => {
    setPlay(true);
    setTimeout(() => {
      setPlay(false);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Sprites
        selectedSprites={getSelectedSprites}
        onSpriteChange={onSpriteChange}
        onSpritePress={changeConfigModal}
        onSpriteLongPress={longPressforPlayTogether}
      />
      <View
        style={styles.dragabbleContainer}
        onLayout={event => {
          setDraggableBoundary(event.nativeEvent.layout);
        }}>
        {getSelectedSprites.map((sprites, index) => (
          <AnimatebleComponent
            events={sprites.actions}
            play={getPlay && !!sprites.selected}
            key={index + ' '}
            icon={sprites.icon}
            x={sprites.x}
            y={sprites.y}
            boundary={getDraggableBoundary}
            onPress={() => {}}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{position: 'absolute', top: 20, end: 30}}
        onPress={resetDrags}>
        <FontAwesome name={'rotate-right'} size={22} color="brown" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 30, end: 30}}
        onPress={onPlayClick}>
        <FontAwesome name={'play-circle'} size={62} color="green" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={getShowConfiguration}
        onRequestClose={() => {
          setShowConfiguration(!getShowConfiguration);
        }}>
        <View style={styles.configContainer}>
          <ConfigureScreen
            stackActions={
              getSelectedSprites[selectedSpriteToConfigure.current]?.actions
            }
            onClose={onConfigScreenChange}
            onActionUpdate={onActionUpdate}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
