# bikit-app
Nativescript + Angular 2 + Typescript App
Firebase Backend
Google Maps sdk

## Prerequisites

## Firebase
Para configurar firebase en la app de iOS y/o Android. Realizar lo siguiente:

* iOS: `GoogleService-Info.plist` debe estar en `app/App_Resources/iOS/GoogleService-Info.plist`

* Android: copia `app/App_Resources/google-services.json` a `platforms/android/google-services.json`

Para instalar el plugin de Firebase: Desde la linea de comando ir a la raiz del código y ejecutar:

```
tns plugin add nativescript-plugin-firebase
```

### iOS
Para el build con Xcode 8 (iOS 10 SDK), abrir proyecto en Xcode utilizando el archivo platforms/ios/appname.__xcworkspace__/ - seleccionar el target de la app, capabilities, habilitar 'Keychain sharing'.

### Android
Instalar los paquetes 'Google Play Services' y 'Google Repository' en el [Android SDK Manager]

#### Abrir `platforms/android/build.gradle`

- Al inicio del archivo en la sección de la dependencia de clases, agregar `classpath "com.google.gms:google-services:3.0.0"` Para que se vea así:
```
  dependencies {
    classpath "com.android.tools.build:gradle:X.X.X"
    classpath "com.google.gms:google-services:3.0.0"
  }
```

- Y al final del archivo, en la última línea, agregar:
```
  apply plugin: "com.google.gms.google-services"
```

#### DexIndexOverflowException
```
com.android.dex.DexIndexOverflowException: method ID not in..
```

Agregar `multiDexEnabled true` en el archivo `app/App_Resources/Android/app.gradle`
para que se vea así:

```
android {  
  defaultConfig {  
    applicationId = "__PACKAGE__"  
    multiDexEnabled true
    generatedDensities = []
  }  
  aaptOptions {  
    additionalParameters "--no-version-vectors"  
  }  
}
```

#### java.lang.OutOfMemoryError: GC overhead limit exceeded

aumentar el Java Max Heap Size :

```
android {  
  defaultConfig {  
    applicationId = "__PACKAGE__"  
    multiDexEnabled true
    generatedDensities = []
  }
  aaptOptions {  
    additionalParameters "--no-version-vectors"  
  }
  dexOptions {
    javaMaxHeapSize "4g"
  }
}
```

## Google Maps 
Para Android, agregar API key en `app/App_Resources/Android/values/nativescript_google_maps_api.xml`.
Para IOS, agregar API key en `app/app.component.ts`.

Ejecutar app
```
tns run ios
```
```
tns run android
```

## Features


Special thanks to [dapriett](https://github.com/dapriett) and [Telerik](http://nativescript.org/)
