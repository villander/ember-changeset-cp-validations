import buildChangeset from 'ember-changeset-cp-validations';
import { moduleFor, test } from 'ember-qunit';
import ValidatedObject from '../helpers/validated-object';
import getOwner from 'ember-getowner-polyfill';

let model;

moduleFor('helper:changeset', 'Integration | Index | buildChangeset', {
  integration: true,

  beforeEach() {
    model = ValidatedObject.extend(getOwner(this).ownerInjection()).create();
  }
});

test('it works', function(assert) {
  let { validateFn, validationMap } = buildChangeset(model);

  assert.equal(typeof validateFn, 'function');
  assert.equal(typeof validationMap, 'object');
});

test('it correctly generates the validation map', function(assert) {
  let { validationMap } = buildChangeset(model);

  assert.deepEqual(validationMap, { username: true, password: true });
});

test('it correctly generates the validate fn', function(assert) {
  let done = assert.async();
  let { validateFn } = buildChangeset(model);

  validateFn({ key: 'username', newValue: 'og' }).then((message) => {
    assert.equal(message, 'Username is too short (minimum is 5 characters)');
    done();
  });
});

