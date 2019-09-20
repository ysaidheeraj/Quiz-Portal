import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | create-quiz', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:create-quiz');
    assert.ok(route);
  });
});
