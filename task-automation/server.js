var express = require('express'),
    app = express();

var bodyParser = require('body-parser');

var operations = {
  Sum : {
      description : 'Adds two numbers',
      input : '<div class="row"><div class="form-group">' +
          '<label for="a">a</label><input id="a" ng-model="a" class="form-control">' +
          '<div><div class="form-group"><label for="b">b</label>' +
          '<input id="b" ng-model="b" class="form-control"><div><div>',

      behaviour : 'var parse = this.parseInt;' +
          'var a = parse(params.a,10);' +
          'var b = parse(params.b,10);' +
          'callback.call(context, a + b);',
      output : '<div class="row" ng-show="resultDone">' +
          '' +
          '<h3>Result is {{result.value}}</h3></div>'
  },

    'Sum Of Square' : {
        description : 'Adds square of two numbers',
        input : '<div class="row"><div class="form-group">' +
            '<label for="a">a</label><input id="a" ng-model="a" class="form-control">' +
            '<div><div class="form-group"><label for="b">b</label>' +
            '<input id="b" ng-model="b" class="form-control"><div><div>',

        behaviour : 'var parse = this.parseInt;' +
            'var a = parse(params.a,10);' +
            'var b = parse(params.b,10);' +
            'callback.call(context, a*a + b*b);',
        output : '<div class="row" ng-show="resultDone">' +
            '' +
            '<h3>Result is {{result.value}}</h3></div>'
    },

    'Sum Of series' : {
        description : 'Add nums between two numbers',
        input : '<div class="row"><div class="form-group">' +
            '<label for="a">a</label><input id="a" ng-model="a" class="form-control">' +
            '<div><div class="form-group"><label for="b">b</label>' +
            '<input id="b" ng-model="b" class="form-control"><div><div>',

        behaviour : 'var parse = this.parseInt;' +
            'var a = parse(params.a,10);' +
            'var b = parse(params.b,10);' +
            'var result = 0;' +
            'for(var i = a; i <=b ; i++){result += i;}' +
            'callback.call(context, result);',
        output : '<div class="row" ng-show="resultDone">' +
            '' +
            '<h3>Result is {{result.value}}</h3></div>'
    },

  Product : {
      description : 'Multiply two numbers',
      input : '<div class="row"><div class="form-group">' +
          '<label for="a">a</label><input id="a" ng-model="a" class="form-control">' +
          '<div><div class="form-group"><label for="b">b</label>' +
          '<input id="b" ng-model="b" class="form-control"><div><div>',

      behaviour : 'var parse = this.parseInt;' +
          'var a = parse(params.a,10);' +
          'var b = parse(params.b,10);' +
          'callback.call(context, a * b);',
      output : '<div class="row" ng-show="resultDone">' +
          '' +
          '<h3>Result is {{result.value}}</h3></div>'
  },

  'State Census' : {
      description : 'Shows Census of state',
      input : '<div class="row"><div class="form-group"><label for="state">State</label>' +
          '<input id="state" ng-model="state" class="form-control"></div>',

      behaviour : 'var ams = this.$ams;' +
          'var state = params.state;' +
          'var stateDetailsPromise = ams.getStateStats(state);' +
          'stateDetailsPromise.then(function(stats){stats.name = state;callback.call(context, stats)});',
      output : '<div class="row" ng-show="resultDone">' +
          '<table class="table table-striped table-bordered">' +
          '<thead><tr>' +
          '<th>Name</th>' +
          '<th>Type</th>' +
          '<th>Population</th>' +
          '<th>% Population</th>' +
          '<th>Sex Ratio</th></tr>' +
          '</thead><tbody><tr>' +
          '<td>{{result.value.name}}</td>' +
          '<td>{{result.value.Type}}</td>' +
          '<td>{{result.value.Population}} million</td>' +
          '<td>{{result.value.Percentage}}</td>' +
          '<td>{{result.value[\'Sex Ratio\']}}</td></tr></tbody></table></div>'
    },
    'Multiple State Census' : {
        description : 'Shows Census of states',
        input : '<div class="row"><div class="form-group"><label for="states">Comma Separated States</label><input id="states" ng-model="states" class="form-control"></div>',
        behaviour : 'var ams = this.$ams;var $q = ams.$q;var states= params.states.split(\',\');' +
            'var promises = [];' +
            'for(var i = 0; i < states.length;i ++){promises.push(ams.getStateStats(states[i]));}' +
            'var aggregatePromise = $q.all(promises);' +
            'aggregatePromise.then(function(stats){callback.call(context, stats)});',
        output : '<div class="row" ng-show="resultDone">' +
            '<table class="table table-striped table-bordered">' +
            '<thead><tr><th>Name</th>' +
            '<th>Type</th><th>' +
            'Population</th>' +
            '<th>% Population</th>' +
            '<th>Sex Ratio</th></tr></thead>' +
            '<tbody><tr ng-repeat="data in result.value">' +
            '<td>{{data.name}}</td>' +
            '<td>{{data.Type}}</td>' +
            '<td>{{data.Population}} million</td>' +
            '<td>{{data.Percentage}}</td>' +
            '<td>{{data[\'Sex Ratio\']}}</td>' +
            '</tr></tbody></table></div>'
    }
};

//Express 4
app.use(express.static(__dirname, '/'));

var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/app/operations/:name', function(req, res) {
    var operName = req.params.name;
    res.json(operations[operName]);
});

app.get('/app/operations', function(req, res) {
    res.json(operations);
    //res.json(500, { error: 'An error has occurred!' });
});




app.post('/app/operations/:name', function(req, res){
    var name = req.params.name;
    if(!operations[name]){
        operations[name] = {};
    }
    var val = operations[name];
    val.behaviour = req.body.behaviour || val.behaviour;
    val.output = req.body.output || val.output;
    val.input = req.body.input || val.input;
    val.description = req.body.description || val.description;

    return res.json(val);

});


app.post('/app/operations', function(req, res){
    var newOperData = {};
    newOperData.input = req.body.input;
    newOperData.output = req.body.output;
    newOperData.behaviour = req.body.behaviour;
    newOperData.description = req.body.description;
    operations[req.body.name] = newOperData;
    res.json(newOperData);

});

app.delete('/app/operations/:name', function(req, res) {
    var name = req.params.name;
    var data = { status: true };
    delete operations[name];
    res.json(data);
});

app.get('/app/stateStats/:state', function(req, res) {
    var state = req.params.state;
    var data = sensex[state];
    if(data){
        data.name = state;
    }
    res.json(data);
});

app.all('/*', function(req, res) {
    res.sendfile('app/index.html');
});




var sensex = {
    "Uttar Pradesh" : {
        "Type" : "State",
        "Population" : 199,
        "Percentage" : 16.5,
        "Sex Ratio" : 930
    },
    "Mharashtra" : {
        "Type" : "State",
        "Population" : 112,
        "Percentage" : 9.28,
        "Sex Ratio" : 929
    },
    "Bihar" : {
        "Type" : "State",
        "Population" : 104,
        "Percentage" : 8.6,
        "Sex Ratio" : 918
    },
    "West Bengal" : {
        "Type" : "State",
        "Population" : 91,
        "Percentage" : 7.54,
        "Sex Ratio" : 950
    },
    "Andhra Pradesh" : {
        "Type" : "State",
        "Population" : 84,
        "Percentage" : 6.99,
        "Sex Ratio" : 993
    },
    "Madhya Pradesh" : {
        "Type" : "State",
        "Population" : 72,
        "Percentage" : 6.00,
        "Sex Ratio" : 931
    },
    "Tamil Nadu" : {
        "Type" : "State",
        "Population" : 72,
        "Percentage" : 5.96,
        "Sex Ratio" : 996
    },
    "Rajasthan" : {
        "Type" : "State",
        "Population" : 68,
        "Percentage" : 5.66,
        "Sex Ratio" : 928
    },
    "Karnataka" : {
        "Type" : "State",
        "Population" : 61,
        "Percentage" : 5.05,
        "Sex Ratio" : 973
    },
    "Gujrat" : {
        "Type" : "State",
        "Population" : 60,
        "Percentage" : 4.99,
        "Sex Ratio" : 919
    }
};





app.listen(3000);

console.log('Express listening on port 3000');

