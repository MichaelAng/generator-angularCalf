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
    processPromptNames: function () {
        this.appNameModule = this.appName + "App";
    },
    scaffoldFolders: function(){
        this.mkdir("app");
        this.mkdir("app/assets");
        this.mkdir("app/assets/images");
        this.mkdir("app/assets/styles");
        this.mkdir("app/components");
        this.mkdir("app/components/about");
        this.mkdir("app/components/main");
        this.mkdir("dist");
        this.mkdir("test");
        this.mkdir("test/components");
        this.mkdir("test/components/about");
        this.mkdir("test/components/main");
    },
    writing: {
        app: function () {
            var context = {
                module_name: this.appNameModule,
                site_name: this.appName
            };

            this.src.copy('_package.json', 'package.json');
            this.src.copy('_bower.json', 'bower.json');
            this.src.copy("_gruntfile.js", "Gruntfile.js");

            this.src.copy("_main.css", "app/assets/styles/main.css");
            this.src.copy("_footer.html", "app/footer.html");

            this.template("_routers.js", "app/components/" + this.appName + ".routers.js" ,context);
            this.template("_modules.js", "app/components/" + this.appName + ".modules.js" ,context);

            this.template("about/_about.module.js", "app/components/about/about.module.js" ,context);
            this.template("about/_about.controller.js", "app/components/about/about.controller.js" ,context);
            this.template("about/_about.view.html", "app/components/about/about.view.html" ,context);

            this.template("main/_main.module.js", "app/components/main/main.module.js" ,context);
            this.template("main/_main.controller.js", "app/components/main/main.controller.js" ,context);
            this.template("main/_main.view.html", "app/components/main/main.view.html" ,context);

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
