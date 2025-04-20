
plugins {
    id("com.android.application")
    id("kotlin-android")
    id("com.google.gms.google-services")
}

android {
    namespace = "app.lovable.aae24903253a4a22a677e35a688ad26c"
    compileSdk = 34

    defaultConfig {
        applicationId = "app.lovable.aae24903253a4a22a677e35a688ad26c"
        minSdk = 23
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation(platform("com.google.firebase:firebase-bom:33.12.0"))
    
    // Firebase Authentication
    implementation("com.google.firebase:firebase-auth-ktx")
    
    // Firebase Core
    implementation("com.google.firebase:firebase-core")
    
    // Google Play Services for Authentication
    implementation("com.google.android.gms:play-services-auth:20.7.0")
    
    // Capacitor core dependencies
    implementation("com.capacitorjs.plugins:core:5.0.0")
    
    // Android core dependencies
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}
