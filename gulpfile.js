var gulp = require('gulp'); 
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var p = require('./package.json');

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/ga-basic-slider.js')
        .pipe(rename('ga-basic-slider-' + p.version + '.js'))
        .pipe(gulp.dest('ga-basic-slider'))
        .pipe(rename('ga-basic-slider-' + p.version + '-min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('ga-basic-slider'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/ga-basic-slider.js', ['scripts']);
});

// Default Task
gulp.task('default', ['scripts', 'watch']);