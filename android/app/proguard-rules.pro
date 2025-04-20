
# Firebase Authentication
-keepattributes Signature
-keepattributes *Annotation*
-keepattributes EnclosingMethod
-keepattributes InnerClasses

# Firebase Realtime Database
-keepattributes Signature
-keepattributes *Annotation*
-keepclassmembers class com.yourcompany.models.** {
  *;
}

# General
-keep class com.google.android.gms.** { *; }
-keep class com.google.firebase.** { *; }
