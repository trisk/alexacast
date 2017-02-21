var gulp = require('gulp');
var fork = require('child_process').fork;


gulp.task('watch', function(cb) {
    var watcher = gulp.watch(['*.js','**/*.js'], ['default']);
});

gulp.task('default', function(){
    fork('./index', []);
});