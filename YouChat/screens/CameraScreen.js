import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/camerascreen'
import { TouchableOpacity, View } from 'react-native'
import { Camera } from 'expo-camera'
import { StatusBar } from 'expo-status-bar'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from "expo-file-system"

function CameraScreen() {

  const [permission, setPermission] = useState(false)
  const cameraRef = useRef()

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      // await MediaLibrary.saveToLibraryAsync(photo.uri)
      const filename = 'saved_image.jpg';
      try {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}youchat`, { intermediates: true })
        await FileSystem.moveAsync({
          from: photo.uri,
          to: `${FileSystem.documentDirectory}youchat/image.jpg`
        })

        // console.log(`${FileSystem.documentDirectory}youchat/saved_image.jpg`);

        const image = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}youchat`)
        console.log(image);
      } catch (error) {
        console.log(error);
      }

    }
  }

  useEffect(() => {
    (
      async () => {
        const cameraPermissionResult = await Camera.requestCameraPermissionsAsync()
        if (cameraPermissionResult.status === 'granted') setPermission(true)
        else console.log('request to camera permission failed')

        const externalStoragePermissionResult = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
      }
    )()
  }, [])

  return (
    <View style={styles.cameramain}>
      <StatusBar hidden />
      {permission && <Camera style={[styles.camera]} type={Camera.Constants.Type.back} focusable={true} ref={cameraRef}>



      </Camera>}
      <View style={styles.takepic}>
        <TouchableOpacity activeOpacity={0.8} style={styles.takepicbtn} onPress={takePicture}>

        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CameraScreen