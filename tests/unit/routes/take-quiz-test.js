import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | take-quiz', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:take-quiz');
    assert.ok(route);
  });
});
