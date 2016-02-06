## reduxr-reducer-helpers

A utility to handle common array manipulation reducer functions

[![Build Status](https://travis-ci.org/chrisdavies/reduxr-reducer-helpers.svg?branch=master)](https://travis-ci.org/chrisdavies/reduxr-reducer-helpers)

## Usage

It's pretty common to see a reducer that looks like this:

```js
export default objReducer([], {
  // Remove a specified member from the list...
  removeMember_done: (state, {data}) => state.filter(m => m.id !== data.id),

  // Find a specified member and update it...
  activateMember_done: (state, {data}) =>
    state.map(m => m.id === data.id ? {...m, isActive: true} : m)
})
```

This can be done more simply by using `reduxr-reducer-helpers`.

```js
import {setPropsByDataId, removeByDataId} from 'reduxr-reducer-helpers';

export default objReducer([], {
  // Remove a specified member from the list...
  removeMember_done: removeByDataId,

  // Find a specified member and update it...
  activateMember_done: setPropsByDataId({ isActive: true })
})
```

There are a handful of functions in `reducer-helpers`. You can check out the source. But here's the list:

`removeById` - Remove an item from an array using the action.id property.

`removeByDataId` - Remove an item from an array using the action.data.id property (useful when dealing with ajax results)

`setPropsById` - Sets properties of any items in an array that whose id matches `action.id`

`setPropsByDataId` - Sets properties of any items in an array that whose id matches `action.data.id` (useful when dealing with ajax results)

These four functions cover a tremendous number of common scenarios. The `setPropsById` and `setPropsByDataId` functions can be passed an object which contains literal property values:

```js
setPropsById({name: 'John'})
```

Or it can be passed a function which takes an action and returns the properties to be set:

```js
setPropsById(action => ({name: action.fullName}))
```

## License MIT

Copyright (c) 2015 Chris Davies

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
