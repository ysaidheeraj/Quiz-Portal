import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    name : DS.belongsTo('user'),
    question : DS.attr("String"),
    response : DS.attr("String")
});
