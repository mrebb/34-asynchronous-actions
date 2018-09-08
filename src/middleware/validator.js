const validator = store=>next=>action=> {
  if(action.type==='Thing/ADD'|| 'Thing/UPDATE'){
    console.log(action);
    if(action.payload.name===''){
      alert('ValidationError: category name should not be left blank');
    }
    else{
      let result = next(action);
      return result;
    }
  }
};
 
export default validator;