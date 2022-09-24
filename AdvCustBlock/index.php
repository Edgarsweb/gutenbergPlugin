<?php
/**
 * Plugin Name: Advanced_Block_by_Edgar
 * Description: Creating custom Blocks
 * Version: 1.0
 * Author: Edgar
 * Author URI: https://edgarsblog.com//
 */

if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', dirname( __FILE__ ) . 'build/index.js' );

}

function create_block()
{
    wp_enqueue_script('custom-block', plugin_dir_url(__FILE__).'build/index.js', array('wp-blocks', 'wp-editor', 'wp-element', 'wp-i18n', 'wp-components', 'wp-data', 'wp-core-data', 'wp-block-editor'),true);

}

add_action('enqueue_block_editor_assets', 'create_block');



// styles start 
function create_block_styles()
{
    wp_enqueue_style( 'custom-style', plugins_url(__FILE__ ).'build/style-index.css');
}

add_action('enqueue_block_assets', 'create_block_styles');

 
 
 ?>