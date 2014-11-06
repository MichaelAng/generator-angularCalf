'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var AngularCalfGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        },{
            type: 'confirm',
            name: 'addDemoSection',
            message: 'Would you like to generate a demo section ?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.addDemoSection = props.addDemoSection;

            done();
        }.bind(this));
    },
    scaffoldFolders: function(){
        this.mkdir("app");
        this.mkdir("app/css");
        this.mkdir("app/sections");
        this.mkdir("build");
    },
    copyMainFiles: function(){
        this.copy("_footer.html", "app/footer.html");
        this.copy("_gruntfile.js", "Gruntfile.js");
        this.copy("_package.json", "package.json");
        this.copy("_main.css", "app/css/main.css");

        var context = {
            site_name: this.appName
        };

        this.template("_header.html", "app/header.html", context);
    },
    generateDemoSection: function() {
          if (this.addDemoSection) {
              var done = this.async();
              this.invoke("onepage:section", {args: ["Demo Section"]}, function(){
                  done();
              });
          } else {
              this.write( "app/menu.html", "");
          }
    },
    runNpm: function(){
        var done = this.async();
        this.npmInstall("", function(){
            console.log("\nEverything Setup !!!\n");
            done();
        });
    }
});

module.exports = AngularCalfGenerator;

// 'use strict';
// var util = require('util');
// var path = require('path');
// var yeoman = require('yeoman-generator');
// var yosay = require('yosay');

// var AngularcalfGenerator = yeoman.generators.Base.extend({
//   initializing: function () {
//     this.pkg = require('../package.json');
//   },

//   prompting: function () {
//     var done = this.async();

//     // Have Yeoman greet the user.
//     this.log(yosay(
//       'Welcome to the great Angularcalf generator!'
//     ));

//     var prompts = [{
//       type: 'confirm',
//       name: 'someOption',
//       message: 'Would you like to enable this option?',
//       default: true
//     }];

//     this.prompt(prompts, function (props) {
//       this.someOption = props.someOption;

//       done();
//     }.bind(this));
//   },

//   writing: {
//     app: function () {
//       this.dest.mkdir('app');
//       this.dest.mkdir('app/templates');

//       this.src.copy('_package.json', 'package.json');
//       this.src.copy('_bower.json', 'bower.json');
//     },

//     projectfiles: function () {
//       this.src.copy('editorconfig', '.editorconfig');
//       this.src.copy('jshintrc', '.jshintrc');
//     }
//   },

//   end: function () {
//     this.installDependencies();
//   }
// });

// module.exports = AngularcalfGenerator;
