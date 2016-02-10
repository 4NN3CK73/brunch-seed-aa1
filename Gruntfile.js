module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('_public/package.json'),
    nwjs: {
      options: {
        version: "0.12.3",
        build_dir: './dist',
        // specifiy what to build
        mac: true,
        win: true,
        linux32: true,
        linux64: true
      },
      src: './_public/**/*'
    },
  });

  grunt.loadNpmTasks('grunt-nw-builder');

  grunt.registerTask('default', ['nwjs']);
};
