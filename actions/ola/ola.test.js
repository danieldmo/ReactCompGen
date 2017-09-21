import { ACTIONS } from './index';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

// actions
import {
  // import all your actions here
  fetchola,
  createola,
} from './index';

// mock store configuration
import { defaultState } from 'reducers/pages';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});
const api = 'https://staging.qwil.com';

describe('ola_ACTIONS', () => {
  const expectedActions = [];
  beforeEach(() => {
    window.API_URI = api;
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should contain all the ACTIONS', () => {
    expect(createola).to.exist;
    expect(fetchola).to.exist;

    expect(ACTIONS.CREATE_REQUEST).to.exist;
    expect(ACTIONS.CREATE_SUCCESS).to.exist;
    expect(ACTIONS.CREATE_ERROR).to.exist;

    expect(ACTIONS.FETCH_REQUEST).to.exist;
    expect(ACTIONS.FETCH_SUCCESS).to.exist;
    expect(ACTIONS.FETCH_ERROR).to.exist;
  });

  it('should create a new ola', (done) => {
    const url = `${api}somenumber/`;
    const res = { some: 'data', url: 'url' };

    expectedActions.push({ type: ACTIONS.CREATE_REQUEST });
    expectedActions.push({ type: ACTIONS.CREATE_SUCCESS, created: res });

    fetchMock.post(`${platformUrl}`, res, { status: 201 });

    store.dispatch(createola(url, data))
      .then((created) => {
        expect(store.getActions()[0].type).to.eql(expectedActions[0].type);
        expect(store.getActions()[1].type).to.eql(expectedActions[1].type);
        expect(store.getActions()[1].created).to.exist;
        expect(store.getActions()[1].created.url).to.eql(created.url);
        done();
      });
  });

  it('should fetch the ', (done) => {
    const url = 'url';
    fetchMock.get(url, { someData: true });

    expectedActions.push({
      type: ACTIONS.FETCH_REQUEST,
    });

    expectedActions.push({
      type: ACTIONS.FETCH_SUCCESS,
      data: JSON.stringify({ someData: true }),
    });

    store.dispatch(fetch(url)).then((data) => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });
  });

});
