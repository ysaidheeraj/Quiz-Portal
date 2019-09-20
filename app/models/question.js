import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
    answers : DS.hasMany('answer'),
    options : DS.hasMany('option'),
    question : attr('String'),
    type : attr('String')
});
