var jshint = require('gulp-jshint')
var gulp = require('gulp')
var del = require('del')

var jshintConfig = {asi: true}

function copyFolders(srcFolder, destFolder) {
    return gulp.src(srcFolder)
               .pipe(gulp.dest(destFolder))
}

gulp.task('jshint', function() {
    return gulp.src('src/**/*.js')
               .pipe(jshint(jshintConfig))
               .pipe(jshint.reporter('default'))
})

gulp.task('copy', ['clean', 'jshint'], function() {
    return copyFolders('src/**/*', 'dist/')
               && copyFolders('config/*', 'dist/config')
})

gulp.task('clean', function() {
    return del(['dist/'])
})

gulp.task('default', ['clean', 'jshint', 'copy'])
