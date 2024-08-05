<?php
/**
 * Register Custom Taxonomies
 *
 * @package velocitta-theme
 */

namespace VELOCITTA_THEME\Includes;

use VELOCITTA_THEME\Includes\Traits\Singleton;

/**
 * Class for register taxonomies.
 */
class Register_Taxonomies {
	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		// load class.
		$this->setup_hooks();
	}

	/**
	 * To register action/filter.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	protected function setup_hooks() {

		/**
		 * Actions.
		 */
		add_action( 'init', array( $this, 'register_year_taxonomy' ) );

	}

	/**
	 * Register Taxonomy Year.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_year_taxonomy() {

		$labels = array(
			'name'              => _x( 'Years', 'taxonomy general name', 'velocitta-theme' ),
			'singular_name'     => _x( 'Year', 'taxonomy singular name', 'velocitta-theme' ),
			'search_items'      => __( 'Search Years', 'velocitta-theme' ),
			'all_items'         => __( 'All Years', 'velocitta-theme' ),
			'parent_item'       => __( 'Parent Year', 'velocitta-theme' ),
			'parent_item_colon' => __( 'Parent Year:', 'velocitta-theme' ),
			'edit_item'         => __( 'Edit Year', 'velocitta-theme' ),
			'update_item'       => __( 'Update Year', 'velocitta-theme' ),
			'add_new_item'      => __( 'Add New Year', 'velocitta-theme' ),
			'new_item_name'     => __( 'New Year Name', 'velocitta-theme' ),
			'menu_name'         => __( 'Year', 'velocitta-theme' ),
		);
		$args   = array(
			'labels'             => $labels,
			'description'        => __( 'Movie Release Year', 'velocitta-theme' ),
			'hierarchical'       => false,
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'show_in_nav_menus'  => true,
			'show_tagcloud'      => true,
			'show_in_quick_edit' => true,
			'show_admin_column'  => true,
			'show_in_rest'       => true,
		);
		register_taxonomy( 'movie-year', array( 'movies' ), $args );

	}

}
