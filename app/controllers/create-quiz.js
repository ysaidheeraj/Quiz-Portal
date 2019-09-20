import Controller from '@ember/controller';
import {empty} from '@ember/object/computed'; 

export default Controller.extend({
    validQuestion : empty('question'),
    validOptionA : empty('optionA'),
    validOptionB : empty('optionB'),
    validAnswer : empty('answer'),
    isDisabled : empty('question'),
    selectedType : "Single",

    actions:{
        setType: function(selected) {
            this.set('selectedType', selected);
        },
        addQuestion(){
            var answer = this.answer;
            var question = this.question;
            const optionA = this.optionA;
            var self =this;
            const optionB = this.optionB;
            const optionC = this.optionC;
            const optionD = this.optionD;
            if(this.selectedType === "Single" || this.selectedType === "Multiple"){
                var answers =[];
                var options = [];
                var canInsert = true;
                var fieldsValid = true;
                options.push(optionA);
                options.push(optionB);

                if(typeof optionC !== "undefined" && optionC.length > 0){
                    options.push(optionC);
                }

                if(typeof optionD !== "undefined" && optionD.length > 0){
                    options.push(optionD);
                }

                if(this.validOptionA || this.validOptionB || this.validAnswer){
                    alert("Option A, Option B and Answer are compulsory");
                    canInsert = false;
                    fieldsValid = false;
                }

                if(this.selectedType === "Single" && fieldsValid){
                    answers.push(answer);
                    if(answer !== 'A' && answer !== 'B' && answer !== 'C' && answer !== 'D'){
                        alert("Enter valid answer: A or B or C or D");
                        canInsert = false;
                    }
                }

                if(this.selectedType === "Multiple"){
                    answers = answer.split(",");
                    answers.forEach(function(answer){
                        if(answer !== 'A' && answer !== 'B' && answer !== 'C' && answer !== 'D'){
                            alert("Enter valid option: A or B or C or D");
                            canInsert = false;
                        }
                    })
                }

                if(canInsert){
                    //Adding the question to the database
                    var newQuestion = this.store.createRecord('question',{
                        question:question,
                        type : this.selectedType
                    });

                    newQuestion.save().then(function(response){
                        var questionid = response.id;
                        var questions = self.store.peekRecord('question',questionid);

                        //Adding options
                        options.forEach(function(option){
                            var newOption = self.store.createRecord('option',{
                                questions:questions,
                                option:option
                            });
                            newOption.save();
                        });

                        //Adding answers
                        answers.forEach(function(answer){
                            if(answer === 'A'){
                                answer = optionA;
                            }
                            else if(answer === 'B'){
                                answer = optionB;
                            }
                            else if(answer === 'C'){
                                answer = optionC;
                            }
                            else{
                                answer = optionD;
                            }
                            var newAnswer = self.store.createRecord('answer',{
                                questions:questions,
                                answer:answer
                            });
                            newAnswer.save();
                        });

                        //Resetting the form fields
                        self.set('responseMessage',`Question added successfully`);
                        self.set('question','');
                        self.set('optionA','');
                        self.set('optionB','');
                        self.set('optionC','');
                        self.set('optionD','');
                        self.set('answer','');
                        self.set('selectedType',"Single");
                    });
                }
                
            }

            else if(this.selectedType === "Star"){
                var newQuestion = this.store.createRecord('question',{
                    question:question,
                    type : this.selectedType
                });
                newQuestion.save().then(function(){
                    self.set('responseMessage',`Question added successfully`);
                    self.set('question','');
                    self.set('optionA','');
                    self.set('optionB','');
                    self.set('optionC','');
                    self.set('optionD','');
                    self.set('answer','');
                });
            }
        }
    }
});
