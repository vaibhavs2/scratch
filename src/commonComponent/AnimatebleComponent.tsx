import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutRectangle, PanResponder, Text, TouchableOpacity, View } from 'react-native';
import Draggable from 'react-native-draggable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Action } from '../types';
 
import { randomIntFromInterval } from '../Utils';

type SpriteItem = {
    selected: boolean;
    icon: string;
  };
type Props={
    boundary:LayoutRectangle
    play:boolean;
    icon:string,
    x:number,
    y:number,
    events:Array<Action>
    onPress?:()=>void
}
export type Eventss = "MOVE_X"|"MOVE_Y"|"MOVE_XY"|"ROTATE"|"ORIGIN"|"RANDOM"|"HELLO"|"HELLO2"|"SCALE1"|"SCALE0"|"ON_ROTATE"|"REPEAT"

export function AnimatebleComponent(props:Props){
    const [getMessage, setMessage] = useState('');
    const linearTransitionXY = useRef(new Animated.ValueXY()).current;
    const linearRotation = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const reset = useRef(false)
    const firstRender = useRef(true)

    useEffect(()=>{
        if(props.play){
            initiateAnimation()
        }

    },[props.play])

    useEffect(()=>{
      console.log("rendering")
      if(!firstRender.current) reset.current=true
        linearTransitionXY.setValue({x:props.x, y:props.y  });
        setMessage("");
        linearRotation.setValue(0);
        scale.setValue(1);
        firstRender.current=false
    }, [props.x, props.y])
 
    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (evt, gestureState) => {
            Animated.event([{ y: linearTransitionXY.y, x:linearTransitionXY.x }], {useNativeDriver:false, })({ y: gestureState.moveY, x:gestureState.moveX-60 });
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
          },
        })
      ).current;

    const initiateAnimation = (eventIndex=0)=>{
      if(reset.current){
        reset.current=false
        return};
        if(eventIndex>=props.events.length){
            return;
        }
        const event:Action = props.events[eventIndex]
    
        switch(event.action){
            case 'ROTATE':
                rotateAnimation(eventIndex+1)
                break;
            case 'MOVE_X':
                xTransition(eventIndex+1)
                break;
            case 'MOVE_Y':
                yTransition(eventIndex+1)
                break;
            case 'MOVE_XY':
                xyTranisition('MOVE_XY', eventIndex+1)
                break;
            case 'ORIGIN':
                xyTranisition('ORIGIN', eventIndex+1)
                break;
            case 'RANDOM':
                xyTranisition('RANDOM', eventIndex+1)
                break;
            case 'SCALE1':
                scaleUp(eventIndex+1)
                break;
            case 'SCALE0':
                scaleDown(eventIndex+1)
                break;
            case "HELLO":
              sayHello(eventIndex+1)
              break;
            case "HELLO2":
              sayHello2(eventIndex+1)
              break;
            case "REPEAT":
              initiateAnimation(0)
              break;
        }

      }

    const rotateAnimation = (nextEventIndex:number) => {
        linearRotation.setValue(0)
        Animated.timing(linearRotation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => {initiateAnimation(nextEventIndex)} );
      };

      const xyTranisition = (type:string, nextEventIndex:number) => {
        if(type=='ORIGIN'){
            Animated.spring(linearTransitionXY, {
                toValue:{x:0, y:0},
                useNativeDriver: false,
              }).start(() => {initiateAnimation(nextEventIndex)} )
        }
        else if(type=='RANDOM') {
           const valuex=randomIntFromInterval(100,200);
           const valuey=randomIntFromInterval(50,300);
           Animated.spring(linearTransitionXY, {
            toValue:{x:valuex, y:valuey},
            useNativeDriver: false,
          }).start(() => {initiateAnimation(nextEventIndex)} )
        }else{
            Animated.spring(linearTransitionXY, {
                toValue:{x:50, y:50},
                useNativeDriver: false,
              }).start(() => {initiateAnimation(nextEventIndex)} )
        }
      }

      const xTransition = (nextEventIndex:number) => {
        Animated.timing(linearTransitionXY, {
          toValue: {x:linearTransitionXY.x._value+50, y: linearTransitionXY.y._value},
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => {initiateAnimation(nextEventIndex)});
      };

      const yTransition = (nextEventIndex:number) => {
        Animated.timing(linearTransitionXY, {
            toValue: {x:linearTransitionXY.x._value, y: linearTransitionXY.y._value+50},
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {initiateAnimation(nextEventIndex)});
      };


      const scaleUp = (nextEventIndex:number) => {
        Animated.timing(scale, {
          toValue: scale.__getValue()+1,
          duration: 1000,
          easing: Easing.bounce,
          useNativeDriver: false,
        }).start(() => {initiateAnimation(nextEventIndex)});
      };


      const scaleDown = (nextEventIndex:number) => {
        Animated.timing(scale, {
          toValue: scale.__getValue()-1,
          duration: 1000,
          easing: Easing.bounce,
          useNativeDriver: false,
        }).start(() => {initiateAnimation(nextEventIndex)});
      };

      const sayHello = (nextEventIndex:number)=>{
        setMessage("Hello");
        initiateAnimation(nextEventIndex)
      }
      const sayHello2 = (nextEventIndex:number) =>{
        setMessage("Hello");
        setTimeout(() => {
          setMessage("")
        }, 1000);
        initiateAnimation(nextEventIndex)
      }

      const rotateView = linearRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
      });
 
    return (<Animated.View
        style={[linearTransitionXY.getLayout(),{ transform:[{rotate:rotateView}, { scale:scale } ], width:60, height:60}]}
        {...panResponder.panHandlers}
      ><TouchableOpacity onPress={props?.onPress?.()}>
        <View>
          <Text>{getMessage}</Text>
        <FontAwesome name={props.icon} size={42} />
        </View>

        </TouchableOpacity>
      </Animated.View>);
}