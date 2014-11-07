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
    writing: {
        app: function () {
            this.dest.mkdir('app');
            this.dest.mkdir('app/templates');

            this.src.copy("_footer.html", "app/footer.html");
            this.src.copy("_gruntfile.js", "Gruntfile.js");
            this.src.copy("_main.css", "app/css/main.css");

            this.src.copy('_package.json', 'package.json');
            this.src.copy('_bower.json', 'bower.json');

            var context = {
                site_name: this.appName
            };

            this.template("_header.html", "app/header.html", context);
        },

        projectfiles: function () {
            this.src.copy('editorconfig', '.editorconfig');
            this.src.copy('jshintrc', '.jshintrc');
        }
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
    end: function () {
        this.installDependencies({
            callback: function () {
                console.log('Everything is ready!');
            }
        });
    }

});

module.exports = AngularCalfGenerator;
