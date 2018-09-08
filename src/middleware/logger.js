const logger = store=>next=>action=>{
  console.log('dispatching action..', action);
  let output = next(action);
  console.log('current state of app: ', store.getState());
  return output;
};
export default logger;