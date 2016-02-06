'use strict';

var mix = require('reduxr-mix');

// An array reducer which removes an item using the
// action.id property.
function removeById (state, action) {
  return state.filter(function (s) { return s.id !== action.id })
}

// An array reducer which removes an item using the
// action.data.id property.
function removeByDataId (state, action) {
  return removeById(state, {id: action.data.id});
}

// An array reducer that sets the properties of an
// item in the array using the getId function to
// determine equality. Props can be an object literal
// or a getter function which is passed the action and
// returns an object whose properties are being transferred
// to the appropriate item in the array.
function setPropsBy (getId, props) {
  var getProps = typeof props === 'function' ? props : function () { return props };

  return function (state, action) {
    var actionId = getId(action);
    return state.map(function (o) {
      return getId(o) !== actionId ? o : mix(o, getProps(action))
    })
  }
}

// An array reducer that sets the specified properties
// on the item in the array that matches action.id
function setPropsById (props) {
  return setPropsBy(function (o) { return o.id }, props);
}

// An array reducer that sets the specified properties
// on the item in the array that matches action.data.id
function setPropsByDataId (props) {
  var setter = setPropsById(props);
  return function (state, action) {
    return setter(state, mix(action, {id: action.data.id}))
  }
}

module.exports = {
  removeById: removeById,
  removeByDataId: removeByDataId,
  setPropsBy: setPropsBy,
  setPropsById: setPropsById,
  setPropsByDataId: setPropsByDataId
}
