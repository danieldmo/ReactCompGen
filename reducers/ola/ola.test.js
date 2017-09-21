import { expect } from 'chai';

import * as actions from 'actions/ola';
import { defaultState } from './index';
import reducer from './index.js';

import income from 'components-v2/mocks/income.json';
import user from 'components-v2/mocks/user.json';

describe('ola Reducer', () => {
  let state;
  it('should check the initial state ', () => {
    state = reducer(void 0, {});
    expect(state).to.eql(defaultState);
  });

  it('should have the correct state when fetching earnings', () => {
    state = reducer(state, { type: actions.PAYMENTS_ACTIONS.FETCH_REQUEST });
    expect(state.fetchingola).to.be.true;
    // do your tests here
  });
});
