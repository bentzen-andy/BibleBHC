import AsyncStorage from "@react-native-async-storage/async-storage";

// Stores a key value pair in local storage
export async function setStoredValue(key, val = key) {
  try {
    await AsyncStorage.setItem(`@${key}`, val);
  } catch (err) {
    console.log(err);
  }
}

// Retrieves a particular key from local storage and if successful, passes
// that value to a callback function.
export async function getStoredValue(key, action) {
  try {
    let val = await AsyncStorage.getItem(`@${key}`);
    action(val);
  } catch (err) {
    console.log(err);
  }
}

// Retrieves the values of an array of keys, and passes this
// array of values to a callback function
export async function getMultipleStoredValues(keyArray, action) {
  try {
    let valueArray = [];
    for (const key of keyArray) {
      const value = await AsyncStorage.getItem(`@${key}`);
      valueArray.push(value);
    }
    action(valueArray);
  } catch (err) {
    console.log(err);
  }
}

// Toggle a key value pair in local storage. If exists, it removes
// the key value pair, if not exists, it stores it
export async function toggleStoredValue(key, val = key) {
  try {
    const retrievedVal = await AsyncStorage.getItem(`@${key}`);
    if (retrievedVal != null) {
      await AsyncStorage.removeItem(`@${key}`);
    } else {
      await AsyncStorage.setItem(`@${key}`, val);
    }
  } catch (err) {
    console.log(err);
  }
}
