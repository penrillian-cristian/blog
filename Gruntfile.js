"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            gpp: ["tmp/*/gpp/", "tmp/html/"],
            tmp: ["tmp/"]
        },
        copy: {
            tmp: {
                files: [
                    {
                        cwd: "dev/src/",
                        dest: "tmp/",
                        expand: true,
                        src: ["**"]
                    }
                ]
            }
        },
        html2js: {
            main: {
                dest: "tmp/js/gpp/templates/Templates.js",
                src: ["tmp/html/gpp/*.html"]
            },
            options: {
                base: "tmp",
                module: "Application.Templates"
            }
        },
        jshint: {
            all: ["Gruntfile.js", "dev/src/js/gpp/**/**"],
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                globalstrict: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: "double",
                trailing: true,
                undef: true,
                unused: true,
                globals: {
                    angular: false,
                    console: false,
                    module: false,
                    ApplicationControllers: true
                }
            }
        },
        karma: {
            test: {
                configFile: "dev/tst/configuration/karma.configuration"
            }
        },
        protractor: {
            test: {
                options: {
                    configFile: "dev/tst/configuration/protractor.configuration"
                }
            }
        },
        strip: {
            tmp: {
                src: "tmp/**/*.js",
                options: {
                    inline: true
                }
            }
        },
        useref: {
            html: ["tmp/index.html"],
            temp: ["tmp/"]
        },
        watch: {
            files: ["Gruntfile.js", "dev/**/**"],
            tasks: ["jshint", "karma", "protractor"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-html2js");
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-protractor-runner");
    grunt.loadNpmTasks("grunt-strip");
    grunt.loadNpmTasks("grunt-useref");

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("produce", ["clean:tmp", "copy:tmp", "strip:tmp", "html2js", "useref", "concat", "cssmin", "uglify", "clean:gpp"]);
};
