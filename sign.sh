cd $jdkInstallLocation
./jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore C :\Users\farre\Desktop\CrossplatformPlantID\platforms\android\app\build\outputs\apk\keystore C:\Users\farre\Desktop\Cr ossplatformPlantID\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk key0

cd $androidSdkInstallLocation
./zipalign -v 4 ./zipalign -v 4 C:\Users\farre\Desktop\CrossplatformP
lantID\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk C:\Users\farre\Desktop\CrossplatformP
lantID\platforms\android\app\build\outputs\apk\release\app-release-signed-zipaligned.apk