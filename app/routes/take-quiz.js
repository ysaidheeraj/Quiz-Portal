import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        var questions =  this.store.findAll('question').then(function(questions){
            var response = [];
            questions.forEach(function(question){
                var resp = {};
                resp['id'] = question.get("id");
                resp['question'] = question.get("question");
                var optionWithQuestion = [];
                var options = question.get("options");
                var optionValues = [];
                options.forEach(function(option){
                    var temp = option.get("option");
                    optionWithQuestion.push(resp['question']+","+temp);
                    optionValues.push(temp);
                });
                resp['options'] = optionValues;
                resp['qoptions'] = optionWithQuestion;
                if(question.get("type") === "Multiple"){
                    resp['multiple'] = 1;
                }

                if(question.get("type") === "Star"){
                    resp['star'] = 1;
                }
                
                response.push(resp);
            });
            return response;
        });
        return questions;
    }
});
