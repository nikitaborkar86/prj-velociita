<?php
/**
 * Theme Functions.
 *
 * @package velocitta-theme
 */

if ( ! defined( 'VELOCITTA_THEME_THEME_VERSION' ) ) {
	define( 'VELOCITTA_THEME_THEME_VERSION', '1.0' );
}

if ( ! defined( 'VELOCITTA_THEME_THEME_PATH' ) ) {
	define( 'VELOCITTA_THEME_THEME_PATH', __DIR__ );
}

if ( ! defined( 'VELOCITTA_THEME_THEME_URL' ) ) {
	define( 'VELOCITTA_THEME_THEME_URL', get_template_directory_uri() );
}

if ( ! defined( 'VELOCITTA_THEME_BUILD_URI' ) ) {
	define( 'VELOCITTA_THEME_BUILD_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/build' );
}

if ( ! defined( 'VELOCITTA_THEME_BUILD_PATH' ) ) {
	define( 'VELOCITTA_THEME_BUILD_PATH', untrailingslashit( get_template_directory() ) . '/assets/build' );
}

if ( ! defined( 'VELOCITTA_THEME_SRC_BLOCK_DIR_PATH' ) ) {
	define( 'VELOCITTA_THEME_SRC_BLOCK_DIR_PATH', get_template_directory() . '/assets/build/blocks' );
}

/**
 * Load up the class autoloader.
 */
require_once VELOCITTA_THEME_THEME_PATH . '/includes/helpers/autoloader.php';

/**
 * Theme Init
 *
 * Sets up the theme.
 *
 * @return void
 * @since 1.0.0
 */
function velocitta_theme_get_theme_instance() {
	\VELOCITTA_THEME\Includes\Velocitta_Theme::get_instance();
}

velocitta_theme_get_theme_instance();
