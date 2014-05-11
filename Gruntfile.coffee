module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-haml'
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

    haml:
      default:
        files: [
          expand: true, cwd: 'src/', src: '**/*.haml', dest: 'tmp/build/', ext: '.html'
        ]

      options:
        language:        'ruby'
        rubyHamlCommand: 'bundle exec haml'

    sass:
      default:
        files: [
          expand: true, cwd: 'src/', src: 'stylesheets/*.sass', dest: 'tmp/build/', ext: '.css'
        ]

      options:
        bundleExec: true

    copy:
      components:
        files: [
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
      'haml'
      'sass'
      'copy'
    ]

    grunt.task.run tasks

  grunt.registerTask 'default', ['build']
  grunt.registerTask 'release', ['build', 'compress']
