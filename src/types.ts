export type Events = "MOVE_X"|"MOVE_Y"|"MOVE_XY"|"ROTATE"|"ORIGIN"|"RANDOM"|"HELLO"|"HELLO2"|"SCALE1"|"SCALE0"|"ON_ROTATE"|"REPEAT"

export type Action = {
    name: string;
    isHeader: boolean;
    action: string;
  }