export default function() {
  this.namespace = "/api";
  
  //Adding a question record
  this.post('/questions',(schema,request)=>{
    /*let obj =  JSON.parse(request.requestBody).data.attributes;
    let question = obj.data.attributes.question;*/
    let obj = JSON.parse(request.requestBody);
    let question = obj.question.question;
    let type = obj.question.type;
    return schema.questions.create({question,type});
  });

  //Fetching a question record for a give Id
  this.put('/questions/:id',function({questions},request){
    let id = request.params.id;
    let attrs = this.normalizedRequestAttrs();
    return questions.find(id).update(attrs);
  });

  //Fetching all question records
  this.get('/questions',(schema)=>{
    return schema.questions.all();
  });

  this.get('/questions/:id',(schema,request)=>{
    let id = request.params.id;
    return schema.questions.find(id);
  });

  //Adding answer record
  this.post('/answers',(schema,request)=>{
    /*let obj = JSON.parse(request.requestBody).data.attributes;
    let answer = obj.answer*/
    let obj = JSON.parse(request.requestBody);
    let answer= obj.answer.answer;
    return schema.answers.create({answer});
  });

  //Adding option record
  this.post('/options',(schema,request)=>{
    let obj = JSON.parse(request.requestBody);
    let option= obj.option.option;
    return schema.options.create({option});
  });

  this.post('/responses',(schema,request)=>{
    let obj = JSON.parse(request.requestBody);
    let response = obj.response.response;
    let question = obj.response.question;
    return schema.responses.create({question,response});
  });

  this.post('/users',(schema,request)=>{
    let obj = JSON.parse(request.requestBody);
    let name = obj.user.name;
    return schema.users.create({name});
  });

  //Get user
  this.get('/users',(schema, request)=>{
    /*if(request.queryParams){
      let name = request.queryParams['filter[name]'];
      let filteredUsers = schema.users.all().filter(name);
      return filteredUsers;
    }*/
    
    return schema.users.all();
  })
}
