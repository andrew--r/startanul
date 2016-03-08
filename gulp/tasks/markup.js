import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import plumber      from 'gulp-plumber';
import jade         from 'gulp-jade';
import inheritance  from 'gulp-jade-inheritance';
import cached       from 'gulp-cached';
import filter       from 'gulp-filter';
import prettify     from 'gulp-html-prettify';
import through      from 'through2';
import errorHandler from '../utils/errorHandler';
import paths        from '../paths';

let data = {
	jv0: 'javascript:void(0);',
	timestamp: +new Date()
};

gulp.task('markup', () => {
	return gulp
		.src(`${paths.baseSrc}/**/*.jade`)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(cached('jade'))
		.pipe(gulpif(global.watch, inheritance({basedir: paths.baseSrc})))
		.pipe(filter((file) => /app[\\\/]pages/.test(file.path)))
		.pipe(jade({data: data}))
		.pipe(prettify({
			brace_style: 'expand',
			indent_size: 1,
			indent_char: '\t',
			indent_inner_html: true,
			preserve_newlines: true
		}))
		.pipe(through.obj(function(file, enc, next) {
			const fixedFile = file.clone({contents: false});
			fixedFile.path = file.path.replace(/pages[\/|\\]/g, '');
			this.push(fixedFile);
			next();
		}))
		.pipe(gulp.dest(paths.baseDist))
});