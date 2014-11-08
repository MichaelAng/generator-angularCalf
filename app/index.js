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
        this.mkdir("app/components/core");
        this.mkdir("app/components/core/header");
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

            this.template("_index.html", "app/index.html", context);
            this.src.copy("assets/styles/_main.css", "app/assets/styles/main.css");
            this.src.copy("assets/images/_elephant-logo.png", "app/assets/images/elephant-logo.png");

            this.template("_routers.js", "app/components/" + this.appName + ".routers.js" ,context);
            this.template("_modules.js", "app/components/" + this.appName + ".modules.js" ,context);

            this.template("components/core/header/_header.module.js", "app/components/core/header/header.module.js" ,context);
            this.template("components/core/header/_header.directive.js", "app/components/core/header/header.directive.js" ,context);
            this.template("components/core/header/_header.view.html", "app/components/core/header/header.view.html" ,context);

            this.template("components/about/_about.module.js", "app/components/about/about.module.js" ,context);
            this.template("components/about/_about.controller.js", "app/components/about/about.controller.js" ,context);
            this.template("components/about/_about.view.html", "app/components/about/about.view.html" ,context);

            this.template("components/main/_main.module.js", "app/components/main/main.module.js" ,context);
            this.template("components/main/_main.controller.js", "app/components/main/main.controller.js" ,context);
            this.template("components/main/_main.view.html", "app/components/main/main.view.html" ,context);
        },

        projectfiles: function () {
            this.src.copy('editorconfig', '.editorconfig');
            this.src.copy('jshintrc', '.jshintrc');
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
