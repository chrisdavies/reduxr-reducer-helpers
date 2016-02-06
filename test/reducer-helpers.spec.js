'use strict';

import * as helpers from '../reducer-helpers';
import userGen from './user-gen';

describe('reducer-helpers', function () {
  describe('setPropsByDataId', function () {
    it('updates only the matching objects', function () {
      const state = userGen();
      const setProps = helpers.setPropsByDataId({ name: 'Bar' });
      const newState = setProps(state, { data: {id: 2 }});
      const updatedObjects = newState.filter(o => o.name === 'Bar');

      expect(state).not.toEqual(newState);
      expect(updatedObjects.length).toBe(1);
      expect(updatedObjects[0].id).toBe(2);
    })
  })

  describe('setPropsById', function () {
    it('updates only the matching objects', function () {
      const state = userGen();
      const setProps = helpers.setPropsById({ name: 'Baz' });
      const newState = setProps(state, { id: 1 });
      const updatedObjects = newState.filter(o => o.name === 'Baz');

      expect(state).not.toEqual(newState);
      expect(updatedObjects.length).toBe(1);
      expect(updatedObjects[0].id).toBe(1);
    })
  })

  describe('setPropsBy', function () {
    it('updates only the matching objects', function () {
      const state = userGen();
      const setProps = helpers.setPropsBy(
        o => o.name,
        { a: 'b' }
      );
      const newState = setProps(state, { name: state[1].name });
      const updatedObjects = newState.filter(o => o.a === 'b');

      expect(state).not.toEqual(newState);
      expect(updatedObjects.length).toBe(1);
      expect(updatedObjects[0].id).toBe(1);
    });

    it('accepts a function as props', function () {
      const state = userGen();
      const setProps = helpers.setPropsBy(
        o => o.id,
        ({foo}, {name}) => ({foo: foo + name})
      );
      const newState = setProps(state, { id: 2, foo: 'bar' });
      const updatedObjects = newState.filter(o => o.foo === 'bar' + state[2].name);

      expect(state).not.toEqual(newState);
      expect(updatedObjects.length).toBe(1);
      expect(updatedObjects[0].id).toBe(2);
    });
  })

  describe('removeByDataId', function () {
    it('removes by data id', function () {
      const state = userGen();
      const newState = helpers.removeByDataId(state, { data: { id: 2 } });

      expect(state).not.toEqual(newState);
      expect(newState.filter(o => o.id === 2).length).toBe(0);
    });
  })

  describe('removeById', function () {
    it('returns unchanged state if id is not found', function () {
      const state = userGen();
      const newState = helpers.removeById(state, { id: 223 })

      expect(state).toEqual(newState);
    });

    it('removes by id', function () {
      const state = userGen();
      const newState = helpers.removeById(state, { id: 2 })

      expect(state).not.toEqual(newState);
      expect(newState.filter(o => o.id === 2).length).toBe(0);
    });
  })
});
