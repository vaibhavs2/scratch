import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Action} from '../../../types';
import {getRandomColor} from '../../../Utils';

export const SPRIT_ICONs = [
  {selected: false, icon: 'github-alt'},
  {selected: true, icon: 'empire'},
  {selected: false, icon: 'qq'},
  {selected: false, icon: 'ship'},
  {selected: false, icon: 'pied-piper-alt'},
  {selected: false, icon: 'smile-o'},
  {selected: false, icon: 'gratipay'},
  {selected: false, icon: 'reddit'},
  {selected: false, icon: 'train'},
  {selected: false, icon: 'child'},
  {selected: false, icon: 'tree'},
  {selected: false, icon: 'firefox'},
  {selected: false, icon: 'free-code-camp'},
  {selected: false, icon: 'snowflake-o'},
  {selected: false, icon: 'meetup'},
  {selected: false, icon: 'blind'},
  {selected: false, icon: 'user-secret'},
  {selected: false, icon: 'motorcycle'},
  {selected: false, icon: 'bug'},
];

export type Sprite = {
  icon: string;
  actions: Array<Action>;
  selected?: boolean;
};
const SelectedSpriteItem = (props: {
  item: Sprite;
  index: number;
  onPress?: () => void;
  onLongPress?: () => void;
}) => {
  return (
    <View>
      {props.item.selected && (
        <FontAwesome
          name={'check'}
          size={15}
          color={'green'}
          style={{position: 'absolute', end: 0}}
        />
      )}
      <TouchableOpacity
        style={styles.spriteBtnContainer}
        onLongPress={() => {
          props?.onLongPress?.();
        }}
        onPress={() => {
          props?.onPress?.();
        }}>
        <FontAwesome
          name={props.item.icon}
          size={32}
          color={props.item.actions.length ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
};

type SpriteItem = {
  selected: boolean;
  icon: string;
};
const SpriteMenuItem = (props: {
  item: SpriteItem;
  index: number;
  onPress?: (item: SpriteItem, index: number) => void;
}) => {
  const selected = props.item.selected;
  return (
    <TouchableOpacity
      style={styles.menuSpriteContainer}
      onPress={() => {
        props?.onPress?.(props.item, props.index);
      }}>
      <FontAwesome name={props.item.icon} size={42} />
      <View style={styles.selectedMark}>
        <FontAwesome
          name={selected ? 'close' : 'plus'}
          size={16}
          color={selected ? 'red' : 'green'}
        />
      </View>
    </TouchableOpacity>
  );
};

const NUMBER_COLUMN = 3;

type Props = {
  selectedSprites: Array<Sprite>;
  onSpritePress: (item: Sprite, index: number) => void;
  onSpriteChange: (icon: string, added: boolean) => void;
  onSpriteLongPress?: (item: Sprite, index: number) => void;
};

export function Sprites(props: Props) {
  const [getAllSprites, setAllSprites] = useState([...SPRIT_ICONs]);
  const [getShowModal, setShowModal] = useState(false);

  const onClickItemFromMenu = (item: SpriteItem, index: number) => {
    const tempselected = [...getAllSprites];
    props.onSpriteChange(
      tempselected[index].icon,
      !tempselected[index].selected,
    );
    tempselected[index].selected = !tempselected[index].selected;

    setAllSprites(tempselected);
  };

  const openMenu = () => {
    setShowModal(!getShowModal);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.selectedSprites}
        renderItem={itemObj => (
          <SelectedSpriteItem
            {...itemObj}
            onPress={() => {
              props.onSpritePress(itemObj.item, itemObj.index);
            }}
            onLongPress={() => {
              props?.onSpriteLongPress?.(itemObj.item, itemObj.index);
            }}
          />
        )}
        keyExtractor={item => item.icon}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={openMenu}
            style={styles.addSprinteContainer}>
            <FontAwesome name="plus" size={25} />
          </TouchableOpacity>
        }
        style={{borderRightWidth: 1}}
        contentContainerStyle={{alignItems: 'center'}}
      />
      <Modal
        visible={getShowModal}
        animationType="slide"
        onRequestClose={openMenu}>
        <SafeAreaView style={styles.spriteMenuContainer}>
          <TouchableOpacity style={styles.closeBtnContainer} onPress={openMenu}>
            <FontAwesome name="close" size={34} />
          </TouchableOpacity>
          <FlatList
            numColumns={NUMBER_COLUMN}
            data={getAllSprites}
            renderItem={item => (
              <SpriteMenuItem {...item} onPress={onClickItemFromMenu} />
            )}
            keyExtractor={item => item.icon}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spriteMenuContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  selectedMark: {
    position: 'absolute',
    left: 20,
    top: 0,
  },
  menuSpriteContainer: {
    flex: 1 / NUMBER_COLUMN,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeBtnContainer: {
    flexDirection: 'row-reverse',
    marginTop: 15,
    marginBottom: 20,
  },
  spriteBtnContainer: {
    height: 54,
    width: 54,
    borderRadius: 27,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addSprinteContainer: {
    paddingVertical: 12,
  },
});
