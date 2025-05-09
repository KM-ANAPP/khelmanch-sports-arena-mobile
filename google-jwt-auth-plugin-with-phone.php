<?php
/*
Plugin Name: Google & Phone JWT Auth
Description: Adds custom endpoints for Google OAuth and Phone Number login/registration.
Version: 1.0
Author: Khelmanch
*/

add_action('rest_api_init', function () {
    register_rest_route('jwt-auth/v1', '/google', array(
        'methods'  => 'POST',
        'callback' => 'handle_google_login',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('jwt-auth/v1', '/google/register', array(
        'methods'  => 'POST',
        'callback' => 'handle_google_register',
        'permission_callback' => '__return_true',
    ));
    
    // Add new endpoint for phone authentication
    register_rest_route('jwt-auth/v1', '/phone', array(
        'methods'  => 'POST',
        'callback' => 'handle_phone_login',
        'permission_callback' => '__return_true',
    ));
});

// Existing functions for Google authentication
function handle_google_login($request) {
    $params = $request->get_json_params();
    $email = sanitize_email($params['email']);
    $name = sanitize_text_field($params['name']);
    $username = sanitize_text_field($params['username']);

    if (empty($email)) {
        return new WP_Error('missing_email', 'Email is required', array('status' => 400));
    }

    if (empty($username)) {
        return new WP_Error('missing_username', 'Username is required', array('status' => 400));
    }

    // Check if user exists by email
    $user = get_user_by('email', $email);

    if ($user) {
        // User exists, generate token
        return generate_jwt_token($user);
    } else {
        // User doesn't exist, create a new one
        $random_password = wp_generate_password();
        $user_id = wp_create_user($username, $random_password, $email);

        if (is_wp_error($user_id)) {
            return $user_id;
        }

        // Set display name
        wp_update_user([
            'ID' => $user_id,
            'display_name' => $name,
        ]);

        $user = get_user_by('id', $user_id);
        return generate_jwt_token($user);
    }
}

function handle_google_register($request) {
    $params = $request->get_json_params();
    $email = sanitize_email($params['email']);
    $name = sanitize_text_field($params['name']);
    $username = sanitize_text_field($params['username']);

    if (empty($email)) {
        return new WP_Error('missing_email', 'Email is required', array('status' => 400));
    }

    if (empty($username)) {
        return new WP_Error('missing_username', 'Username is required', array('status' => 400));
    }

    // Check if username exists
    if (username_exists($username)) {
        return new WP_Error('username_exists', 'Username already exists', array('status' => 400));
    }

    // Check if email exists
    if (email_exists($email)) {
        return new WP_Error('email_exists', 'Email already exists', array('status' => 400));
    }

    // Create a new user
    $random_password = wp_generate_password();
    $user_id = wp_create_user($username, $random_password, $email);

    if (is_wp_error($user_id)) {
        return $user_id;
    }

    // Set display name
    wp_update_user([
        'ID' => $user_id,
        'display_name' => $name,
    ]);

    $user = get_user_by('id', $user_id);
    return generate_jwt_token($user);
}

// New function to handle phone authentication
function handle_phone_login($request) {
    $params = $request->get_json_params();
    $phone = sanitize_text_field($params['phone']);
    
    if (empty($phone)) {
        return new WP_Error('missing_phone', 'Phone number is required', array('status' => 400));
    }

    // Try to find user by phone number (stored in user_login field)
    $user = get_user_by('login', $phone);
    
    if ($user) {
        // User exists, generate token
        return generate_jwt_token($user);
    } else {
        // User doesn't exist, create a new one
        $random_password = wp_generate_password();
        $user_id = wp_create_user($phone, $random_password, '');

        if (is_wp_error($user_id)) {
            return $user_id;
        }

        // Set display name
        wp_update_user([
            'ID' => $user_id,
            'display_name' => 'User ' . substr($phone, -4), // Use last 4 digits
        ]);

        $user = get_user_by('id', $user_id);
        return generate_jwt_token($user);
    }
}

function generate_jwt_token($user) {
    $secret_key = defined('JWT_AUTH_SECRET_KEY') ? JWT_AUTH_SECRET_KEY : false;

    if (!$secret_key) {
        return new WP_Error('jwt_auth_secret_key_not_set', 'JWT Auth Secret Key is not defined.', array('status' => 500));
    }

    $issued_at = time();
    $expiration_time = $issued_at + (60 * 60 * 24); // Token valid for 24 hours
    $not_before = $issued_at + 10;            // Token available after 10 seconds

    $data = array(
        'iss' => get_bloginfo('url'),
        'aud' => get_bloginfo('url'),
        'iat' => $issued_at,
        'nbf' => $not_before,
        'exp' => $expiration_time,
        'data' => array(
            'user' => array(
                'id' => $user->ID,
            )
        )
    );

    $jwt = Firebase\JWT\JWT::encode($data, $secret_key, 'HS256');
    $response = array(
        'token' => $jwt,
        'user_email' => $user->user_email,
        'user_nicename' => $user->user_nicename,
        'user_display_name' => $user->display_name,
        'user_id' => $user->ID,
    );

    return $response;
}
