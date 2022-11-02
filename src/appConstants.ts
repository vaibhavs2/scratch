export const d=90

export const ACTIONS = [
    {name: 'Motions', isHeader: true,},
    {name: 'Move X by 50', isHeader: false, action:'MOVE_X'},
    {name: 'Move Y by 50', isHeader: false, action:'MOVE_Y'},
    {name: 'Rotate 360', isHeader: false , action:'ROTATE'},
    {name: 'Go to (0,0)', isHeader: false, action:'ORIGIN'},
    {name: 'Move X=50, Y=50', isHeader: false, action:'MOVE_XY'},
    {name: 'Go to random position', isHeader: false, action:'RANDOM'},
    {name: 'Looks', isHeader: true},
    {name: 'Say Hello', isHeader: false,action:"HELLO"},
    {name: 'Say Hello for one sec', isHeader: false, action:"HELLO2"},
    {name: 'Increase Size', isHeader: false,action:'SCALE1'},
    {name: 'Decrease Size', isHeader: false, action:'SCALE0'},
    {name: 'Events', isHeader: true},
    {name: 'On 360 rotation', isHeader: false, action:"ON_ROTATE"},
    {name: 'Controls', isHeader: true},
    {name: 'Repeat', isHeader: false, action:"REPEAT"},
  ];