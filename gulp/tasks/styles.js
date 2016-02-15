import gulp         from 'gulp';
import plumber      from 'gulp-plumber';
import rupture      from 'rupture';
import stylus       from 'gulp-stylus';
import postcss      from 'gulp-postcss';
import autoprefixer from 'gulp-autoprefixer';
import svg          from 'postcss-svg';
import flexfixes    from 'postcss-flexbugs-fixes';
import cmq          from 'gulp-combine-mq';
import minifyCss    from 'gulp-minify-css';
import rename       from 'gulp-rename';
import errorHandler from '../utils/errorHandler';
import paths        from '../paths';
import { browsers } from '../../package.json';

gulp.task('styles', () => {
	return gulp
		.src('*.styl', {
			cwd: paths.src.styles,
			nonull: true
		})
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(stylus({
			errors: true,
			use: rupture()
		}))
		.pipe(autoprefixer(
			'Android >= ' + browsers.android,
			'Chrome >= ' + browsers.chrome,
			'Firefox >= ' + browsers.firefox,
			'Explorer >= ' + browsers.ie,
			'iOS >= ' + browsers.ios,
			'Opera >= ' + browsers.opera,
			'Safari >= ' + browsers.safari
		))
		.pipe(postcss([
			svg({
				paths: [paths.src.svg]
			}),
			flexfixes()
		]))
		.pipe(cmq({beautify: false}))
		.pipe(minifyCss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.dist.styles))
});