<?php

/**
 * @link              https://blacklead.fr
 * @since             1.0.0
 * @package           Comet
 *
 * @wordpress-plugin
 * Plugin Name:       Comet
 * Plugin URI:        https://blacklead.fr/comet
 * Description:       The visual page builder that's light, fast and modern. Bring your ideas to life fast through the drag & drop and the advanced features.
 * Version:           1.0.0
 * Author:            blacklead
 * Author URI:        https://blacklead.fr
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       comet
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'COMET_VERSION', '1.0.0' );
define( 'COMET_DEBUG', false );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-comet-activator.php
 */
function activate_comet() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-comet-activator.php';
	Comet_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-comet-deactivator.php
 */
function deactivate_comet() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-comet-deactivator.php';
	Comet_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_comet' );
register_deactivation_hook( __FILE__, 'deactivate_comet' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-comet.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_comet() {

	$plugin = new Comet();
	$plugin->run();

}
run_comet();
