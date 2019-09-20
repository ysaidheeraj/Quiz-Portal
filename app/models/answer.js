import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    questions : DS.belongsTo('question'),
    answer : DS.attr('String')
});
