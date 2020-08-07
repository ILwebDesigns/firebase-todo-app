export const LOADING_ON = "LOADING_ON";
export const LOADING_OFF = "LOADING_OFF";

export const progressOn = () => ({
  type: LOADING_ON,
});

export const progressOff = () => ({
  type: LOADING_OFF,
});
