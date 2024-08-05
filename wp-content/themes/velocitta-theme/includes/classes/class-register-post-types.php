<?php
/**
 * Register Post Types
 *
 * @package velocitta-theme
 */

namespace VELOCITTA_THEME\Includes;

use VELOCITTA_THEME\Includes\Traits\Singleton;

/**
 * Class for register post types.
 */
class Register_Post_Types {
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
		add_action( 'init', array( $this, 'register_movie_cpt' ), 0 );

	}

	/**
	 * Register Custom Post Type Movie.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_movie_cpt() {

		$labels = array(
			'name'                  => _x( 'Movies', 'Post Type General Name', 'velocitta-theme' ),
			'singular_name'         => _x( 'Movie', 'Post Type Singular Name', 'velocitta-theme' ),
			'menu_name'             => _x( 'Movies', 'Admin Menu text', 'velocitta-theme' ),
			'name_admin_bar'        => _x( 'Movie', 'Add New on Toolbar', 'velocitta-theme' ),
			'archives'              => __( 'Movie Archives', 'velocitta-theme' ),
			'attributes'            => __( 'Movie Attributes', 'velocitta-theme' ),
			'parent_item_colon'     => __( 'Parent Movie:', 'velocitta-theme' ),
			'all_items'             => __( 'All Movies', 'velocitta-theme' ),
			'add_new_item'          => __( 'Add New Movie', 'velocitta-theme' ),
			'add_new'               => __( 'Add New', 'velocitta-theme' ),
			'new_item'              => __( 'New Movie', 'velocitta-theme' ),
			'edit_item'             => __( 'Edit Movie', 'velocitta-theme' ),
			'update_item'           => __( 'Update Movie', 'velocitta-theme' ),
			'view_item'             => __( 'View Movie', 'velocitta-theme' ),
			'view_items'            => __( 'View Movies', 'velocitta-theme' ),
			'search_items'          => __( 'Search Movie', 'velocitta-theme' ),
			'not_found'             => __( 'Not found', 'velocitta-theme' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'velocitta-theme' ),
			'featured_image'        => __( 'Featured Image', 'velocitta-theme' ),
			'set_featured_image'    => __( 'Set featured image', 'velocitta-theme' ),
			'remove_featured_image' => __( 'Remove featured image', 'velocitta-theme' ),
			'use_featured_image'    => __( 'Use as featured image', 'velocitta-theme' ),
			'insert_into_item'      => __( 'Insert into Movie', 'velocitta-theme' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Movie', 'velocitta-theme' ),
			'items_list'            => __( 'Movies list', 'velocitta-theme' ),
			'items_list_navigation' => __( 'Movies list navigation', 'velocitta-theme' ),
			'filter_items_list'     => __( 'Filter Movies list', 'velocitta-theme' ),
		);
		$args   = array(
			'label'               => __( 'Movie', 'velocitta-theme' ),
			'description'         => __( 'The movies', 'velocitta-theme' ),
			'labels'              => $labels,
			'menu_icon'           => 'dashicons-admin-post',
			'supports'            => array(
				'title',
				'editor',
				'excerpt',
				'thumbnail',
				'revisions',
				'author',
				'comments',
				'trackbacks',
				'page-attributes',
				'custom-fields',
			),
			'taxonomies'          => array(),
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => true,
			'hierarchical'        => false,
			'exclude_from_search' => false,
			'show_in_rest'        => true,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
		);

		register_post_type( 'movies', $args );

	}


}
