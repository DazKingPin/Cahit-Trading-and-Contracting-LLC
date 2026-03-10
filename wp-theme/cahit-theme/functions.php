<?php
if (!defined('ABSPATH')) exit;

define('CAHIT_VERSION', '1.0.0');
define('CAHIT_DIR', get_template_directory());
define('CAHIT_URI', get_template_directory_uri());

function cahit_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo', array(
        'height' => 56,
        'width' => 200,
        'flex-width' => true,
        'flex-height' => true,
    ));

    register_nav_menus(array(
        'primary' => __('Primary Menu', 'cahit-theme'),
        'footer' => __('Footer Menu', 'cahit-theme'),
    ));
}
add_action('after_setup_theme', 'cahit_setup');

function cahit_enqueue_scripts() {
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Sora:wght@300;400;500;600;700;800&display=swap', array(), null);
    wp_enqueue_style('lucide-icons', 'https://unpkg.com/lucide-static@latest/font/lucide.css', array(), null);
    wp_enqueue_style('cahit-theme', CAHIT_URI . '/assets/css/theme.css', array(), CAHIT_VERSION);

    wp_enqueue_script('cahit-theme', CAHIT_URI . '/assets/js/theme.js', array(), CAHIT_VERSION, true);
    wp_enqueue_script('cahit-chatbot', CAHIT_URI . '/assets/js/chatbot.js', array(), CAHIT_VERSION, true);

    wp_localize_script('cahit-theme', 'cahitData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'themeUrl' => CAHIT_URI,
        'nonce' => wp_create_nonce('cahit_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'cahit_enqueue_scripts');

function cahit_register_post_types() {
    register_post_type('project', array(
        'labels' => array(
            'name' => 'Projects',
            'singular_name' => 'Project',
            'add_new_item' => 'Add New Project',
            'edit_item' => 'Edit Project',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-building',
        'rewrite' => array('slug' => 'projects'),
    ));

    register_post_type('service', array(
        'labels' => array(
            'name' => 'Services',
            'singular_name' => 'Service',
            'add_new_item' => 'Add New Service',
            'edit_item' => 'Edit Service',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-hammer',
        'rewrite' => array('slug' => 'services'),
    ));

    register_post_type('lead', array(
        'labels' => array(
            'name' => 'Leads',
            'singular_name' => 'Lead',
        ),
        'public' => false,
        'show_ui' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-groups',
    ));
}
add_action('init', 'cahit_register_post_types');

function cahit_handle_lead_submission() {
    check_ajax_referer('cahit_nonce', 'nonce');

    $data = array(
        'post_title' => sanitize_text_field($_POST['name'] ?? 'Lead'),
        'post_content' => sanitize_textarea_field($_POST['details'] ?? ''),
        'post_type' => 'lead',
        'post_status' => 'publish',
    );

    $post_id = wp_insert_post($data);

    if ($post_id) {
        update_post_meta($post_id, '_lead_email', sanitize_email($_POST['email'] ?? ''));
        update_post_meta($post_id, '_lead_phone', sanitize_text_field($_POST['phone'] ?? ''));
        update_post_meta($post_id, '_lead_service', sanitize_text_field($_POST['service_type'] ?? ''));
        wp_send_json_success(array('id' => $post_id));
    } else {
        wp_send_json_error('Failed to save lead');
    }
}
add_action('wp_ajax_cahit_submit_lead', 'cahit_handle_lead_submission');
add_action('wp_ajax_nopriv_cahit_submit_lead', 'cahit_handle_lead_submission');

function cahit_handle_quote_submission() {
    check_ajax_referer('cahit_nonce', 'nonce');

    $data = array(
        'post_title' => sanitize_text_field($_POST['fullName'] ?? 'Quote Request'),
        'post_content' => sanitize_textarea_field(json_encode($_POST)),
        'post_type' => 'lead',
        'post_status' => 'publish',
    );

    $post_id = wp_insert_post($data);

    if ($post_id) {
        update_post_meta($post_id, '_lead_email', sanitize_email($_POST['email'] ?? ''));
        update_post_meta($post_id, '_lead_phone', sanitize_text_field($_POST['phone'] ?? ''));
        update_post_meta($post_id, '_lead_service', 'Quote Request');
        update_post_meta($post_id, '_lead_budget', sanitize_text_field($_POST['budget'] ?? ''));
        wp_send_json_success(array('id' => $post_id));
    } else {
        wp_send_json_error('Failed to save quote request');
    }
}
add_action('wp_ajax_cahit_submit_quote', 'cahit_handle_quote_submission');
add_action('wp_ajax_nopriv_cahit_submit_quote', 'cahit_handle_quote_submission');

function cahit_handle_chat() {
    check_ajax_referer('cahit_nonce', 'nonce');
    $message = sanitize_text_field($_POST['message'] ?? '');
    $session_id = sanitize_text_field($_POST['sessionId'] ?? '');

    $reply = "Thank you for your message. Our team will get back to you soon. You can also reach us at ctc@cahitcontracting.com or call +968 2411 2406.";
    wp_send_json_success(array('reply' => $reply));
}
add_action('wp_ajax_cahit_chat', 'cahit_handle_chat');
add_action('wp_ajax_nopriv_cahit_chat', 'cahit_handle_chat');

function cahit_widgets_init() {
    register_sidebar(array(
        'name' => 'Footer Widget Area',
        'id' => 'footer-widget',
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4 class="footer-widget-title">',
        'after_title' => '</h4>',
    ));
}
add_action('widgets_init', 'cahit_widgets_init');
