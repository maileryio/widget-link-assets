'use strict';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

// more example https://medium.com/js-dojo/unit-testing-in-vue-mocha-part-2-ebf1df4b8897

describe('_____', () => {
  before(() => {
  });

  after(() => {
  });

  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('should render _____ on mount', () => {
    expect(true).to.be.true;
    expect(false).to.be.false;
    expect(undefined).to.be.undefined;
    expect([1,2,3]).to.have.property(1);
    expect(['.js','.jsx','.vue']).to.include.members(['.js','.jsx']);
    expect({id: 1, name: 'sky'}).to.include.all.keys(['id', 'name']);
  });
});
