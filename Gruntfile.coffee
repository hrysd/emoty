module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-yaml'

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    clean:
      tmp:   ['tmp/build']
      build: ['build']

    coffee:
      default:
        files: [
          expand: true, cwd: 'src/', src: 'javascripts/*.coffee', dest: 'tmp/build/', ext: '.js'
        ]

    yaml:
      default:
        files: [
          expand: true, cwd: 'src/', src: ['**/*.yml', '**/*.yaml'], dest: 'tmp/build/'
        ]

    sass:
      default:
        files: [
          expand: true, cwd: 'src/', src: 'stylesheets/*.sass', dest: 'tmp/build/', ext: '.css'
        ]

    copy:
      components:
        files: [
          {src: 'src/popup.html',                         dest: 'tmp/build/popup.html'}
          {src: 'bower_components/jquery/dist/jquery.js', dest: 'tmp/build/javascripts/jquery.js'}
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
        files: [
          expand: true, cwd: 'build/', src: '**'
        ]

      options:
        archive: 'emoty.zip'

  grunt.registerTask 'build', ->
    tasks = [
      'clean'
      'coffee'
      'yaml'
      'sass'
      'copy'
    ]

    grunt.task.run tasks

  grunt.registerTask 'default', ['build']
  grunt.registerTask 'release', ['build', 'compress']
