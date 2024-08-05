<?php
/**
 * Registers the velocitta-theme/sample block.
 *
 * @global array    $attrs   Block attributes passed to the render callback.
 * @global string   $content Block content from InnerBlocks passed to the render callback.
 * @global WP_Block $block   Block registration object.
 *
 * @package velocitta-theme
 */

namespace VELOCITTA_THEME\Blocks;

use VELOCITTA_THEME\Includes\Block_Base;

/**
 *  Class for the velocitta-theme/sample block.
 */
class Sample extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'sample';
	}
}
