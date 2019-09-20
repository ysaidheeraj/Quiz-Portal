import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    responses : DS.hasMany('response'),
    name : DS.attr("String")
});
