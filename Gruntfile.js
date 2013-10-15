module.exports = function(grunt) {
    grunt.initConfig({
        // 配置文件，参考package.json配置方式，必须设置项是
        // name, version, author
        // name作为gallery发布后的模块名
        // version是版本，也是发布目录
        // author必须是{name: "xxx", email: "xxx"}格式
        pkg: grunt.file.readJSON('abc.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        copy: {
            main: {
                files: [
                    {src: ['<%= pkg.version %>/index.css'], dest: '<%= pkg.version %>/build/index.css'}
                ]
            }
        },
        cssmin: {
            combine: {
                files: {
                    '<%= pkg.version %>/build/index-min.css': ['<%= pkg.version %>/build/index.css']
                }
            }
        },
        stylus: {
            options:{
                compress:false,
                linenos:true
            },
            compile: {
                files: {
                    '<%= pkg.version %>/index.css': '<%= pkg.version %>/index.styl'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.styl',
                tasks: ['stylus']
            }
        }
    });

    // 使用到的任务，可以增加其他任务
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    return grunt.registerTask('default', ['stylus','copy','cssmin','watch']);
};