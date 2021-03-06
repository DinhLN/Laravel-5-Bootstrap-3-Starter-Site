var gulp = require("gulp");
var bower = require("gulp-bower");
var elixir = require("laravel-elixir");

gulp.task('bower', function() {
    return bower();
});

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

var paths = {
    'jquery': 'vendor/jquery-legacy/dist',
    'bootstrap': 'vendor/bootstrap-sass/assets',
    'bootswatch': 'vendor/bootswatch',
    'fontawesome': 'vendor/font-awesome',
    'metisMenu': 'vendor/metisMenu/dist',
    'colorbox': 'vendor/jquery-colorbox',
    'dataTables': 'vendor/datatables/media',
    'dataTablesBootstrap3Plugin': 'vendor/datatables-bootstrap3-plugin/media'
};

elixir.config.sourcemaps = false;

elixir(function (mix) {

    // Run bower install
    mix.task('bower');

    // Copy fonts straight to public
    mix.copy('resources/' + paths.bootstrap + '/fonts/bootstrap/**', 'public/fonts');
    mix.copy('resources/' + paths.fontawesome + '/fonts/**', 'public/fonts');

    // Copy images straight to public
    mix.copy('resources/' + paths.colorbox + '/example3/images/**', 'public/img');

     // Compile SASS and output to default resource directory
    mix.sass('app.scss', 'resources/css', {
        includePaths: [
            'resources/' + paths.bootstrap + '/stylesheets/',
            'resources/' + paths.bootswatch + '/',
            'resources/' + paths.fontawesome + '/scss/'
        ]
    });

    // Merge CSSs
    mix.styles([
        paths.colorbox + '/example3/colorbox.css',
        paths.dataTablesBootstrap3Plugin + '/css/datatables-bootstrap3.css',
        paths.metisMenu + '/metisMenu.css',
        'css/app.css' // app.css is generated by sass and has some overrides
    ], 'public/css/all.css', 'resources/');

    // Merge scripts
    mix.scripts([
        paths.jquery + '/jquery.js',
        paths.bootstrap + '/javascripts/bootstrap.js',
        paths.dataTables + '/js/jquery.dataTables.js',
        paths.dataTablesBootstrap3Plugin + '/js/datatables-bootstrap3.js',
        paths.colorbox + '/jquery.colorbox.js',
        paths.metisMenu + '/metisMenu.js'
    ], 'public/js/all.js', 'resources/');

    // Cache-bust all.css and all.js
    mix.version([
        'public/css/all.css',
        'public/js/all.js'
    ]);
});

