import React, {useRef, useState} from 'react';
import {FlatList, SafeAreaView, View, Text, TouchableOpacity, PanResponder, Animated, LayoutRectangle} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {styles} from './styles';
import { ACTIONS } from '../../appConstants';
import { Action } from '../../types';


const ExecutableItems = ({item, onPress}: {item:Action, onPress:()=>void}) => {
  return (
    <View style={styles.stackedItemContainer}>
      <Text style={styles.stackedItem}>{item.name}</Text>
      <TouchableOpacity onPress={onPress}>
      <FontAwesome name={'close'} size={25} color="red" />
      </TouchableOpacity>
      
    </View>
  );
};

const SectionHeader = ({title, icon}: {title: string; icon: string}) => {
  return (
    <View style={styles.sectionHeadres}>
      <FontAwesome name={icon} size={28} />
      <Text style={{fontSize: 18}}> {title}</Text>
    </View>
  );
};



type Props = {
  onActionUpdate:(actions:Action, actionIndex:number)=>void;
  stackActions:Array<Action>;
  onClose:()=>void
}
export default function ConfigureScreen(props:Props) {

  const scrollOffset = useRef<number>(0)
  const flatlistLayout = useRef<LayoutRectangle>({height:0, width:0, x:0, y:0})
  const [isItemDraggingIndex, setIsItemDraggingIndex] = useState(-1);
  const draggingIndex = useRef(-1);
  const pressedPointer = useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        ReactNativeHapticFeedback.trigger("impactLight")
        Animated.event([{ y: pressedPointer.y, x:pressedPointer.x }], {useNativeDriver:false, })({ y: gestureState.x0-flatlistLayout.current.y, x:gestureState.x0 });
        let index = Math.floor((scrollOffset.current + gestureState.y0-flatlistLayout.current.y)/60);
        if(index<0)index=0;
        if(index> ACTIONS.length)index = ACTIONS.length-1
        draggingIndex.current  = index;
        setIsItemDraggingIndex(index)

        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([{ y: pressedPointer.y, x:pressedPointer.x }], {useNativeDriver:false, })({ y: gestureState.moveY, x:gestureState.moveX });
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        false,
      onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.moveX>flatlistLayout.current.width/2){
          updateStackActions()
        }
        setIsItemDraggingIndex(-1);

        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        setIsItemDraggingIndex(-1);
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })
  ).current;

const updateStackActions = ()=>{
  //@ts-ignore
  props.onActionUpdate(ACTIONS[draggingIndex.current], -1)
}
  const onStackActionRemove = (index:number)=>{
      //@ts-ignore
    props.onActionUpdate(ACTIONS[index], index)
  }
  return (
    <SafeAreaView style={styles.screenContainer}>
        <TouchableOpacity style={styles.configHeaderContainer} onPress={props.onClose}>
          <FontAwesome name='close' size={28}/>
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
        <SectionHeader title="Code" icon="code" />
        <SectionHeader title="Executables" icon="flag" />
        </View>
        { isItemDraggingIndex!=-1 &&  <Animated.View
              style={{
                height:0,
                position:'absolute',
                zIndex:2,
                width:flatlistLayout.current.width/2,
                transform: [{ translateX: pressedPointer.x }, { translateY: pressedPointer.y }],
              }}
            >
            <View
            style={styles.actionItemContainer}>
               <View style={styles.dragabblePoint}>
                <Text style={styles.point}>@</Text>
              </View>
            <Text style={styles.itemTitle}>
              {ACTIONS[isItemDraggingIndex].name}
            </Text>
          </View>
            </Animated.View>}
      <View style={styles.listContainer}
            onLayout={(event)=>{
              flatlistLayout.current = event.nativeEvent.layout
            }}
      >
        <FlatList
        onScroll={(event)=>{
          scrollOffset.current =  event.nativeEvent.contentOffset.y
        }}
        scrollEventThrottle={90}
          scrollEnabled={isItemDraggingIndex==-1}
          data={ACTIONS}
          renderItem={({item, index}) => (
            <View
            style={
              item.isHeader
                ? styles.actionHeaderContainer
                : styles.actionItemContainer
            }>
              {!item.isHeader && <View {...panResponder.panHandlers} style={styles.dragabblePoint}>
                <Text style={styles.point}>@</Text>
              </View>}
            <Text style={item.isHeader ? styles.headerTitle : styles.itemTitle}>
              {item.name}
            </Text>
          </View>
          )}
          keyExtractor={item => item.name}
        />
        <FlatList
          data={props.stackActions}
          renderItem={({item, index})=><ExecutableItems item={item} onPress={()=>{onStackActionRemove(index)}} />}
          keyExtractor={(item, index) => item.name+index}
        />
      </View>
    </SafeAreaView>
  );
}
