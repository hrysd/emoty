module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    clean:
      tmp:   ['tmp/build']
      build: ['build']

    coffee:
      compile:
        files: [
          expand: true, cwd: 'src/', src: 'javascripts/*.coffee', dest: 'tmp/build/', ext: '.js'
        ]

    yaml:
      default:
        files: [
          expand: true, cwd: 'src/', src: ['**/*.yml', '**/*.yaml'], dest: 'tmp/build/'
        ]

    haml:
      options:
        language:        'ruby'
        rubyHamlCommand: 'bundle exec haml'

      default:
        files: [
          expand: true, cwd: 'src/', src: '**/*.haml', dest: 'tmp/build/', ext: '.html'
        ]

    hamlbars:
      default:
        files: [
          expand: true, cwd: 'src/', src: '**/*.hamlbars', dest: 'tmp/hamlbars/', ext: '.handlebars'
        ]

    emberTemplates:
      options:
        templateName: (sourceFile) ->
          sourceFile.replace(/tmp\/hamlbars\/javascripts\//,'')

      compile:
        files: [
          expand: true, cwd: 'tmp/hamlbars', src: '**/*.handlebars', dest: 'tmp/build/', ext: '.js'
        ]

    shell:
      bower:
        command: 'bower install'
        options:
          stdout: true

    sass:
      dist:
        files: [
          expand: true, cwd: 'src/', src: 'stylesheets/*.sass', dest: 'tmp/build/', ext: '.css'
        ]

        options:
          bundleExec: true

    copy:
      components:
        files: [
          {src: 'bower_components/jquery/jquery.js',         dest: 'tmp/build/javascripts/jquery.js'}
          {src: 'bower_components/ember/index.js',           dest: 'tmp/build/javascripts/ember.js'}
          {src: 'bower_components/handlebars/handlebars.js', dest: 'tmp/build/javascripts/handlebars.js'}
        ]

      build:
        files: [
          expand: true, cwd: 'tmp/build/', src: '**', dest: 'build/'
        ]

      images:
        files: [
          expand: true, cwd: 'src/', src: 'images/**/*.png', dest: 'build/'
        ]

    compress:
      default:
        options:
          archive: 'emoty.zip'

        files: [
          expand: true, cwd: 'build/', src: '**'
        ]

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-ember-templates'
  grunt.loadNpmTasks 'grunt-haml'
  grunt.loadNpmTasks 'grunt-hamlbars'
  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks 'grunt-yaml'

  grunt.registerTask 'build', ->
    tasks = [
      'clean'
      'shell'
      'coffee'
      'yaml'
      'haml'
      'hamlbars'
      'emberTemplates'
      'sass'
      'copy'
    ]

    grunt.task.run tasks

  grunt.registerTask 'default', ['build']

