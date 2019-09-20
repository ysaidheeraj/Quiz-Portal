import Controller from '@ember/controller';
import {empty} from '@ember/object/computed'
export default Controller.extend({
    buttonText: "Submit Responses",
    disabledText : false,
    doAction : "submitResponses",
    isDisabled : empty('user'),
    isHidden : false,
    actions :{
        submitResponses(){
            var ele = document.getElementsByTagName('input');
            var answers = [];
            var length = -1;
            var currentQuestion, i;
            var self = this;
            if(ele[1].name === "optradio" || ele[1].name === "stars"){
                currentQuestion = ele[1].id;
            }
            else{
                currentQuestion = ele[1].name;
            }
            var answer = {};
            var qans = [];
            var question;
            for(i=1; ele[i]; i++){
                if(ele[i].name === "optradio" || ele[i].name === "stars"){
                    question = ele[i].id;
                }
                else{
                    question = ele[i].name;
                }
                if(currentQuestion !== question){
                    currentQuestion = question;
                    length+=1;
                    answer['answers'] = qans;
                    length += 1;
                    answers.push(answer);
                    answer={};
                    answer['question'] = currentQuestion;
                    qans = [];
                }

                if(length === -1){
                    answer['question'] = currentQuestion;
                }
                if(ele[i].checked){
                    qans.push(ele[i].value);
                }
            }
            answer['answers'] = qans;
            answers.push(answer);

            //Inserting records
            var newUser = self.store.createRecord('user',{
                name:self.user
            });
            newUser.save().then(function(response){
                var userId = response.id;
                var name = self.store.peekRecord('user',userId);
                answers.forEach(function(answer){
                    var question = answer['question'];
                    var responses = answer['answers'];
                    responses.forEach(function(response){
                        var newResponse = self.store.createRecord('response',{
                            name : name,
                            question : question,
                            response : response
                        });
                        newResponse.save();
                    });
                });
            });
            self.set("buttonText","Show Results"),
            self.set("doAction","evaluateResponses"),
            self.set("disabledText",true);
            self.set("isHidden",true);
        },

        evaluateResponses(){
            var self = this;
            var points = 0;
            points = this.store.findAll('user').then(function(userRecords){
                userRecords.forEach(function(userRecord){
                    if(userRecord.name === self.user){
                        points = userRecord.get('responses').then(function(responses){
                            responses.forEach(function(response){
                               points = self.store.findRecord('question',response.question).then(function(record){
                                    var answers = record.get("answers");
                                    answers.forEach(function(answer){
                                        if(answer.answer === response.response){
                                            points += 1;
                                            console.log("1",points);
                                        }
                                    });
                                    return points;
                                });
                            });
                            return points;
                        });
                    }
                });
                return points;
            });
            console.log(points.result);  
        }
    }
});
