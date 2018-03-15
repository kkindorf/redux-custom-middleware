//function returns a function that returns another function
export default function({ dispatch }) {
    return next => action => {
        //if the action does not have a payload or the payloaddoes not have .then property, we don't care about it send it on
        if(!action.payload || !action.payload.then) {
            return next(action);
        }
        //make sure the action's promise resolves
        action.payload
            .then(function(response) {
                //this creates a new action with the old type, but replace a promise with the response data
               const newAction = { ...action, payload: response }
               //dispatch sends the action back to the top level reducer so all of the middleware is run through again
               dispatch(newAction);
            });

        //next says to forward this action onto other middleware or if no more middleware send it to the reducer
        //all of our actions flow through this middleware
    };
}