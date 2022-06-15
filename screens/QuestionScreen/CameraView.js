import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { getStorage, ref, uploadString, uploadBytes } from "firebase/storage";
import { Camera, CameraType } from "expo-camera";

const CameraView = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function takPicture() {
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
      base64: true,
    });
    setPreviewVisible(true);
    setCapturedImage(photo);
  }

  const savePhoto = async () => {
    const storage = getStorage();
    const uri = capturedImage.uri;

    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "some-child");

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    // var ref = storage.ref().child("my-image");
    // return ref.put(blob);
  };

  async function savePhoto_() {
    console.log("saving photo... ");
    console.log("---capturedImage");
    console.log(capturedImage);
    const imageName = capturedImage.uri.split("/").pop();
    console.log("---imageName");
    console.log(imageName);

    let imageBase64 = capturedImage.base64;
    console.log("---imageBase64");
    console.log(imageBase64);

    imageBase64 = `data:text/plain;base64,${imageBase64}`;

    const storage = getStorage();
    const storageRef = ref(storage, `questions/${imageName}`);

    // Data URL string
    // const message4 =
    //   "data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB";
    uploadString(storageRef, imageBase64, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
    });

    // uploadBytes(storageRef, capturedImage.uri).then((snapshot) => {
    //   console.log("Uploaded a blob or file!");
    // });
  }

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {previewVisible ? (
        <ImageBackground
          source={{ uri: capturedImage && capturedImage.uri }}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 15,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => setPreviewVisible(false)}
                style={{
                  width: 130,
                  height: 40,

                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={savePhoto}
                style={{
                  width: 130,
                  height: 40,

                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  save photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takPicture}>
              <Text style={styles.text}> [TAKE PICTURE] </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default CameraView;
